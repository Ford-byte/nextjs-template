"use client";

import apiClient from "@/app/axios";
import Close from "@/public/icons/close";
import Edit from "@/public/icons/edit";
import { useEffect, useState } from "react";
import EditUserDetailsPopup from "../popups/editUserDetailsPopup";

export default function UserDetails({ name }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = localStorage.getItem("user_id");
        if (!id && !name) return;

        let response;
        if (id) {
          response = await apiClient.get(`/api/user/profile?id=${id}`);
        } else {
          response = await apiClient.get(`/api/user/profile?name=${name}`);
        }

        setData(response?.data?.data?.[0] || {});
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [name]);
  return (
    <div className="relative min-h-[200px] lg:min-h-[300px] py-[24px]">
      {/* <EditUserDetailsPopup /> */}
      {/* <div className="abolute shadow-lg top-0 left-0 full-center">
        <div className="bg-black/50 w-full h-full z-[19]" />
        <EditUserDetailsPopup />
      </div> */}
      <div className="center">
        <div className="container center flex-col items-center gap-y-[12px]">
          <h2 className="text-5xl font-bold capitalize">{name}</h2>
          <div className="flex flex-col max-w-[700px] py-[24px] gap-y-[24px]">
            <div className="flex justify-end lg:translate-x-1/2 pointer">
              <Edit className={`size-6`} />
            </div>
            <div className="flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600] text-center">
                Experience and Expertise
              </h3>
              <p className="text-justify">{data?.expertise || "sample"}</p>
            </div>
            <div className="flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Specialized Areas
              </h3>
              <p className="text-justify">{data?.specialize || "sample"}</p>
            </div>
            <div className="flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Why Train with Kurt?
              </h3>
              <p className="text-justify">{data?.question || "sample"}</p>
            </div>
            <h3 className="text-black font-bold text-left">
              {data?.quote || ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
