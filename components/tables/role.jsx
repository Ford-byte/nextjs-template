import apiClient from "@/app/axios";
import { useEffect, useState, useCallback } from "react";
import CreateRole from "../popups/createRolePopup";
import Toast from "../popups/toast";
import Close from "@/public/icons/close";
import DeleteRolePopup from "../popups/deleteRolePopup";

export default function RoleTable() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  const [selectedRoles, setSelectedRoles] = useState({});
  const [popUp, setPopup] = useState(false);
  const [toast, setToastData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchPermissions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/permissions`);
      setPermissions(response.data?.data || []);
    } catch (error) {
      console.log("Error fetching permissions:", error);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/role`);
      setRoles(response.data?.data || []);
      return response.data?.data || [];
    } catch (error) {
      console.log("Error fetching roles:", error);
      return [];
    }
  }, []);

  const fetchUserRoles = useCallback(async (roles) => {
    try {
      const rolePermissions = {};
      await Promise.all(
        roles.map(async (role) => {
          const response = await apiClient.get(
            `/api/permissions/grant?role_id=${role.id}`
          );
          rolePermissions[role.id] = response.data?.data || [];
        })
      );
      setUserRoles(rolePermissions);
    } catch (error) {
      console.log("Error fetching user roles:", error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    await fetchPermissions();
    const fetchedRoles = await fetchRoles();
    await fetchUserRoles(fetchedRoles);
  }, [fetchPermissions, fetchRoles, fetchUserRoles]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoleChange = (roleId, permissionId, isChecked) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: isChecked,
      },
    }));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRoles = async (roleId) => {
    if (isSaving) return;

    setIsSaving(true);

    const assignedPermissions = Object.entries(selectedRoles[roleId] || {})
      .filter(([_, isChecked]) => isChecked)
      .map(([permissionId]) => parseInt(permissionId));

    try {
      const response = await apiClient.post(`/api/permissions/grant`, {
        role_id: roleId,
        permission_id: assignedPermissions,
      });

      setToastData({
        message: response.data?.message || "Roles updated successfully",
        status: 200,
      });

      fetchData();
      setSelectedRoles((prev) => ({
        ...prev,
        [roleId]: {},
      }));
    } catch (error) {
      setToastData({
        message: "Failed to update roles.",
        status: 500,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (roleId) => {
    setDeleteId(roleId);
  };

  return (
    <div className="h-[600px] flex pt-[100px] justify-center px-6 ">
      <div className="container mx-auto dark:text-gray-800 ml-[300px] ">
        <div className="flex justify-end">
          <button
            className="py-[12px] px-[24px] bg-blue-500 rounded-md my-[12px] uppercase font-bold text-white"
            onClick={() => setPopup(!popUp)}
          >
            Create Role
          </button>
          {popUp && (
            <div className="fixed inset-0 flex items-center justify-center">
              <CreateRole
                toggle={() => setPopup(false)}
                trigger={fetchPermissions}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-[12px] h-full ">
          {roles?.map((role) => (
            <div
              key={role.id}
              className="h-full shadow-lg bg-gray-200 p-[12px] overflow-auto w-[500px]"
            >
              <h2 className="text-xl font-bold uppercase">
                {role.role} Permissions
              </h2>

              <h3>Granted Permissions:</h3>
              <ul className="flex flex-wrap gap-x-[4px] gap-y-[4px] w-[400px] py-[6px]">
                {userRoles[role?.id]?.map((roleItem) => (
                  <li
                    key={roleItem.id}
                    className="text-green-600 font-semibold border border-black py-[8px] w-fit px-[12px] flex items-center gap-2"
                  >
                    {roleItem.keyword}
                    <Close
                      className="size-5 fill-black cursor-pointer"
                      onClick={() => handleDelete(roleItem?.granted_id)}
                    />
                  </li>
                )) || <li className="text-gray-400">No roles available</li>}
              </ul>

              <h3>Assign Permissions:</h3>
              <form>
                {permissions?.map((perm) => (
                  <div key={perm.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`perm-${role.id}-${perm.id}`}
                      name={`perm-${role.id}`}
                      checked={selectedRoles[role.id]?.[perm.id] || false}
                      onChange={(e) =>
                        handleRoleChange(role.id, perm.id, e.target.checked)
                      }
                      className={`${
                        userRoles[role.id]?.some((p) => p.id === perm.id)
                          ? "hidden"
                          : " flex"
                      }`}
                      disabled={userRoles[role.id]?.some(
                        (p) => p.id === perm.id
                      )}
                    />

                    <label
                      htmlFor={`perm-${role.id}-${perm.id}`}
                      className={`${
                        userRoles[role.id]?.some((p) => p.id === perm.id)
                          ? "hidden"
                          : " flex"
                      }`}
                    >
                      {perm.keyword}
                    </label>
                  </div>
                ))}
              </form>

              <button
                onClick={() => handleSaveRoles(role.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          ))}
        </div>
      </div>
      {toast && <Toast status={toast?.status} message={toast?.message} />}

      {deleteId && (
        <div className="absolute top-0 left-0 full-center">
          <div className="absolute bg-black/50 inset-0 z-[1]"></div>
          <DeleteRolePopup
            deleteId={deleteId}
            onClose={() => setDeleteId(null)}
            fetchData={fetchData}
          />
        </div>
      )}
    </div>
  );
}
