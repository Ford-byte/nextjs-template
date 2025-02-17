"use client";

import { useState } from "react";
import apiClient from "@/app/axios";
import Toast from "./toast";

export default function DeletePopup(props) {
  const [toastData, setToastData] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(
        `/api/user?id=${props?.data?.id}`
      );

      setToastData({
        status: response?.status,
        message: "User deleted successfully!",
      });

      setTimeout(() => {
        props?.onClick;
        setToastData(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );

      setToastData({
        status: "error",
        message: "Failed to delete user!",
      });
    }
  };

  return (
    <div className="full-center">
      <div
        className="fixed inset-0 w-full h-full bg-black/50"
        onClick={props?.onClick}
      />

      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] text-center relative z-[1]">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this user?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={props?.onClick}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}
    </div>
  );
}
