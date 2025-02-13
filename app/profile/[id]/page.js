"use client";
import apiClient from "@/app/axios";
import ProfileBanner from "@/components/blocks/ProfileBanner";
import UserDetails from "@/components/blocks/UserDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "./not_found";

export default function Page() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/api/user/${id}`);
        setUserData(response?.data?.data[0]);
        console.log(response?.data?.data[0]);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  return userData ? (
    <div>
      <div className="min-h-[700px] relative">
        <ProfileBanner
          name={userData?.fullname}
          wallpic={userData?.wallpic}
          profile={userData?.profile}
        />
        <UserDetails name={userData?.Fullname || id} />
      </div>
    </div>
  ) : (
    <NotFound />
  );
}
