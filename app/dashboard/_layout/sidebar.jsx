"use client";
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
        <button
          className={`py-[12px] w-full cursor-pointer ${
            activeTab === "user" ? "bg-black text-white font-[600]" : ""
          }`}
          onClick={() => handleTabChange("user")}
        >
          User
        </button>
        <button
          className={`py-[12px] w-full cursor-pointer ${
            activeTab === "trainer" ? "bg-black text-white font-[600]" : ""
          }`}
          onClick={() => handleTabChange("trainer")}
        >
          Trainer
        </button>
      </div>
    </div>
  );
}
