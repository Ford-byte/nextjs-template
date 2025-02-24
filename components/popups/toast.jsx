"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast({ status, message, position }) {
  useEffect(() => {
    if (status && message) {
      const toastId = "toast-message";
      if (status === "success") {
        toast.success(message, { toastId });
      } else if (status === "error") {
        toast.error(message, { toastId });
      } else if (status === "warning") {
        toast.warn(message, { toastId });
      }
    }
  }, [status, message]);

  return (
    <ToastContainer
      position={position || "top-right"}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss={false}
      limit={3}
      className="!z-100"
    />
  );
}
