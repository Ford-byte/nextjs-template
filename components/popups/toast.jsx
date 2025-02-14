"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast({ status, message, position }) {
  useEffect(() => {
    if (status && message) {
      const toastId = "toast-message";
      if (status === 200) {
        toast.success(message, { toastId });
      } else {
        toast.error(message, { toastId });
      }
    }
  }, [status, message]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
    />
  );
}
