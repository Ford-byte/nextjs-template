"use client";

import useLocalStorage from "@/components/store/localStorage";
import Error from "./error";
import ProfileBanner from "@/components/blocks/ProfileBanner";
import UserDetails from "@/components/blocks/UserDetails";
import apiClient from "../axios";
import { useState, useEffect } from "react";

const Loading = () => {
  return (
    <div className="w-full min-h-[700px] flex justify-center items-center bg-black">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default function Page() {
  const { isLogged, isLoading, stopLoading } = useLocalStorage();
  const [userData, setData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("fullname");

    if (userId) {
      const fetchData = async () => {
        try {
          const response = await apiClient.get(`/api/user/${userId}`);
          setData(response?.data?.data[0]);
          stopLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          stopLoading(false);
        }
      };
      fetchData();
    } else {
      console.error("User ID is missing");
      stopLoading(false);
    }
  }, [userId, stopLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return isLogged ? (
    <div className="min-h-[700px] relative">
      <ProfileBanner
        name={userData?.fullname || ""}
        wallpic={`/uploads/${userData?.profile}` || "/images/rex.webp"}
        profile={`/uploads/${userData?.profile}` || "/images/rex.webp"}
      />
      <UserDetails name={userData?.fullname || ""} />
    </div>
  ) : (
    <Error />
  );
}
