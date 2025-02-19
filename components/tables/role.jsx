"use client";

import apiClient from "@/app/axios";
import { useEffect, useState, useCallback } from "react";
import CreateRole from "../popups/createRolePopup";

export default function RoleTable() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState({});
  const [selectedRoles, setSelectedRoles] = useState({});
  const [popUp, setPopup] = useState(false);

  // Fetch permissions
  const fetchPermissions = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/permissions`);
      setPermissions(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  }, []);

  // Fetch roles
  const fetchRoles = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/role`);
      setRoles(response.data?.data || []);
      return response.data?.data || [];
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  }, []);

  // Fetch user roles with permissions
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
      console.error("Error fetching user roles:", error);
    }
  }, []);

  // Combined fetch function
  const fetchData = useCallback(async () => {
    await fetchPermissions();
    const fetchedRoles = await fetchRoles();
    await fetchUserRoles(fetchedRoles);
  }, [fetchPermissions, fetchRoles, fetchUserRoles]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle role change in checkbox
  const handleRoleChange = (roleId, permissionId, isChecked) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: isChecked,
      },
    }));
  };

  // Handle saving roles
  const handleSaveRoles = async (roleId) => {
    const assignedPermissions = Object.entries(selectedRoles[roleId] || {})
      .filter(([_, isChecked]) => isChecked)
      .map(([permissionId]) => parseInt(permissionId));

    try {
      await apiClient.post(`/api/permissions/grant`, {
        role_id: roleId,
        permission_id: assignedPermissions,
      });
      alert("Roles updated successfully!");
      await fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating roles:", error);
      alert("Failed to update roles.");
    }
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
              className="h-full shadow-lg bg-gray-200 p-[12px] overflow-auto"
            >
              <h2 className="text-xl font-bold uppercase">
                {role.role} Permissions
              </h2>

              {/* Granted Permissions */}
              <h3>Granted Permissions:</h3>
              <ul>
                {userRoles[role.id]?.map((roleItem) => (
                  <li
                    key={roleItem.id}
                    className="text-green-600 font-semibold"
                  >
                    {roleItem.keyword}
                  </li>
                ))}
              </ul>

              {/* Assign Permissions */}
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
                    />
                    <label htmlFor={`perm-${role.id}-${perm.id}`}>
                      {perm.keyword}
                    </label>
                  </div>
                ))}
              </form>

              {/* Save Button */}
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
    </div>
  );
}
