"use client";

import apiClient from "@/app/axios";
import { useEffect, useState } from "react";

export default function UserDetails(props) {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id && !props?.name) return;

        let response;
        if (id) {
          response = await apiClient.get(`/api/user/profile?id=${id}`);
        } else {
          response = await apiClient.get(
            `/api/user/profile?name=${props?.name}`
          );
        }

        setData(response?.data?.data?.[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id, props?.name]); // Depend on both `id` and `props?.name`

  return (
    <div className="relative min-h-[200px] lg:min-h-[300px] py-[24px]">
      <div className="center">
        <div className="container center flex-col items-center gap-y-[12px]">
          <h2 className="text-5xl font-bold capitalize">{props?.name}</h2>
          <div className="flex flex-col  max-w-[700px] py-[24px] gap-y-[24px]">
            <div className=" flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Experience and Expertise
              </h3>
              <p className="text-justify">{data?.expertise}</p>
            </div>
            <div className=" flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Specialized Areas
              </h3>
              <p className="text-justify">{data?.specialize}</p>
            </div>
            <div className=" flex flex-col items-center gap-y-[12px]">
              <h3 className="text-xl text-blue-500 font-[600]">
                Why Train with Kurt?
              </h3>
              <p className="text-justify">{data?.question}</p>
            </div>
            <h3 className=" text-black font-bold">{data?.quote}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
