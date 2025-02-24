"use client";
import Barbell from "@/public/icons/barbell";
import User from "@/public/icons/user";
import Users from "@/public/icons/users";
import { useEffect, useState } from "react";

export default function AdminSideBar(props) {
  const [activeTab, setActiveTab] = useState("user");

  useEffect(() => {
    props?.changeTab("user");
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    props?.changeTab(tab);
  };

  return (
    <div className="relative h-full pt-[100px] flex justify-center">
      <div className="flex flex-col gap-y-[12px] py-[24px] w-full text-center">
        <div
          className={`center gap-[12px] py-[12px] w-full cursor-pointer ${
            activeTab === "user" ? "bg-black text-white font-[600]" : ""
          }`}
          onClick={() => handleTabChange("user")}
        >
          <span>
            <User className={`size-6`} />
          </span>
          <button onClick={() => handleTabChange("user")}>User</button>
        </div>
        <div
          className={`center gap-[12px] py-[12px] w-full cursor-pointer ${
            activeTab === "trainer"
              ? "bg-black fill-white text-white font-[600]"
              : ""
          }`}
          onClick={() => handleTabChange("trainer")}
        >
          <span>
            <Barbell className={`size-5`} />
          </span>
          <button onClick={() => handleTabChange("trainer")}>Trainer</button>
        </div>

        <div
          className={`center gap-[12px] py-[12px] w-full cursor-pointer ${
            activeTab === "role"
              ? "bg-black fill-white text-white font-[600]"
              : ""
          }`}
          onClick={() => handleTabChange("role")}
        >
          <span>
            <Users className={`size-6`} />
          </span>
          <button onClick={() => handleTabChange("role")}>Roles</button>
        </div>
      </div>
    </div>
  );
}
