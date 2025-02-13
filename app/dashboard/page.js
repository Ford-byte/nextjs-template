"use client";

import { useEffect, useState } from "react";
import Error from "./error";
import UserTable from "@/components/tables/user";

export default function Page() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="w-full h-full bg-gray-200 animate-pulse min-h-[700px]" />
    );

  return role === "user" ? (
    <div className="min-h-[700px]">
      <UserTable />
    </div>
  ) : (
    <Error />
  );
}
