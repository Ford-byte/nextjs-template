"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast({ status, message }) {
  useEffect(() => {
    if (status === 200) {
      toast.success(message);
    } else if (status) {
      toast.error(message);
    }
  }, [status, message]);

  return <ToastContainer />;
}
