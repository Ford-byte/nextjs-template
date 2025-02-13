"use client";

import apiClient from "@/app/axios";
import Edit from "@/public/icons/edit";
import { useEffect, useState } from "react";

export default function UserTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/api/user");
        setData(response?.data?.data || []);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[700px] flex items-center justify-center">
      <div className="container p-4 mx-auto sm:p-6 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Contacts</h2>
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="dark:bg-gray-300">
                <th className="p-3">Username</th>
                <th className="p-3">Fullname</th>
                <th className="p-3">Email</th>
                <th className="p-3">Profile</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
              {loading ? (
                <tr>
                  <td className="px-3 py-4 text-center" colSpan={5}>
                    <div className="center">
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
                      {user.profile ? (
                        <img
                          src={user.profile}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        "No profile"
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        title="Edit User"
                        className="p-1 rounded-full dark:text-gray-600 hover:bg-gray-200 focus:bg-gray-300"
                      >
                        <Edit className="size-6" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-4 text-center" colSpan={5}>
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
