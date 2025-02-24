"use client";

import Toast from "./toast";
import useApiStorage from "../store/api";

export default function DeletePopup(props) {
  const { deleteUserData, toastData } = useApiStorage();
  const handleDelete = async () => {
    try {
      const response = await deleteUserData({ id: props?.data?.id });
      console.log(response?.data);
    } catch (error) {
      console.log(
        "Error deleting user:",
        error.response?.data || error.message
      );
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
