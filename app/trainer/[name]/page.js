"use client";
import apiClient from "@/app/axios";
import ProfileBanner from "@/components/blocks/ProfileBanner";
import UserDetails from "@/components/blocks/UserDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/user/${name}`);
        console.log(response?.data?.data[0]);
        setData(response?.data?.data[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]);

  return (
    <div className="min-h-[700px]">
      <div>
        <div className="min-h-[700px] relative">
          <ProfileBanner
            name={`/uploads/${data?.fullname}`}
            wallpic={`/uploads/${data?.profile}`}
            profile={`/uploads/${data?.profile}`}
          />
          <UserDetails name={data?.fullname || name} />
        </div>
      </div>
    </div>
  );
}
