"use client";

import apiClient from "@/app/axios";
import { useEffect, useState } from "react";

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
      <div className="center">
        <div className="container center flex-col items-center gap-y-[12px]">
          <h2 className="text-5xl font-bold capitalize">{name}</h2>
          <div className="flex flex-col max-w-[700px] py-[24px] gap-y-[24px]">
            <div className="flex flex-col items-center gap-y-[12px]">
              {data?.expertise && (
                <div>
                  <h3 className="text-xl text-blue-500 font-[600] text-center">
                    Experience and Expertise
                  </h3>
                  <p className="text-justify">{data?.expertise || ""}</p>
                </div>
              )}
            </div>
            {data?.specialize && (
              <div className="flex flex-col items-center gap-y-[12px]">
                <h3 className="text-xl text-blue-500 font-[600]">
                  Specialized Areas
                </h3>
                <p className="text-justify">{data?.specialize || ""}</p>
              </div>
            )}
            {data?.question && (
              <div className="flex flex-col items-center gap-y-[12px]">
                <h3 className="text-xl text-blue-500 font-[600]">
                  Why Train with Kurt?
                </h3>
                <p className="text-justify">{data?.question || ""}</p>
              </div>
            )}
            <h3 className="text-black font-bold text-left">
              {data?.quote || ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
