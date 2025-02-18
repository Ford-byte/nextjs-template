"use client";

import apiClient from "@/app/axios";
import Delete from "@/public/icons/delete";
import Edit from "@/public/icons/edit";
import { useEffect, useState } from "react";
import EditPopup from "../popups/editPopup";
import DeletePopup from "../popups/deletePopup";

export default function UserTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setUser] = useState(null);
  const [selectedUserDelete, setDeleteUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/api/trainer");
        setData(response?.data?.data || []);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData]);

  return (
    <div className="min-h-[700px] flex items-center justify-center  ">
      <div className="absolute">
        {selectedUser && (
          <EditPopup
            data={selectedUser}
            onClick={() => {
              setUser(null);
            }}
          />
        )}
        {selectedUserDelete && (
          <DeletePopup
            data={selectedUserDelete}
            onClick={() => {
              setDeleteUser(null);
            }}
          />
        )}
      </div>

      <div className="container p-4 mx-auto sm:p-6 dark:text-gray-800 ml-[300px]">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Contacts</h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="dark:bg-gray-300">
                <th className="p-3">Username</th>
                <th className="p-3">Fullname</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
              {loading ? (
                <tr>
                  <td className="px-3 py-4 text-center" colSpan={4}>
                    <div className="flex justify-center">
                      <div className="size-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((user, index) => (
                  <tr key={user.id || `user-${index}`}>
                    <td className="px-3 py-2">{user.username}</td>
                    <td className="px-3 py-2">{user.fullname}</td>
                    <td className="px-3 py-2">{user.email}</td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        title="Edit User"
                        className="p-1 rounded-full dark:text-gray-600 hover:bg-gray-200 focus:bg-gray-300"
                        onClick={() => setUser(user)}
                      >
                        <Edit className="size-6" />
                      </button>
                      <button
                        type="button"
                        title="Delete User"
                        className="p-1 rounded-full dark:text-gray-600 hover:bg-gray-200 focus:bg-gray-300"
                        onClick={() => setDeleteUser(user)}
                      >
                        <Delete className="size-6 stroke-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-4 text-center" colSpan={4}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
