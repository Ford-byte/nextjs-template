"use client";

import { useEffect, useState } from "react";
import Error from "./error";
import useLocalStorage from "@/components/store/localStorage";
import dynamic from "next/dynamic";
import RoleTable from "@/components/tables/role";

const UserTable = dynamic(() => import("@/components/tables/user"), {
  ssr: false,
});
const AdminSideBar = dynamic(() => import("./_layout/sidebar"), {
  ssr: false,
});
const TrainerTable = dynamic(() => import("@/components/tables/trainer"), {
  ssr: false,
});

export default function Page() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLogged } = useLocalStorage();
  const [tab, setTab] = useState("user");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="w-full h-full bg-gray-200 animate-pulse min-h-[700px] !z-[10]" />
    );

  if (!isLogged) return <Error />;

  const changeTab = (e) => {
    setTab(e);
  };

  return role === "admin" ? (
    <div className="flex min-h-[700px] relative">
      <div className="w-[300px] bg-gray-200 h-full absolute ">
        <AdminSideBar changeTab={changeTab} />
      </div>
      <div className="flex-1">
        {tab === "user" ? (
          <UserTable />
        ) : tab === "trainer" ? (
          <TrainerTable />
        ) : tab === "role" ? (
          <RoleTable />
        ) : (
          <Error />
        )}
      </div>
    </div>
  ) : (
    <Error />
  );
}
