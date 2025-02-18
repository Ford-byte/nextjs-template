"use client";
import apiClient from "@/app/axios";
import ProfileBanner from "@/components/blocks/ProfileBanner";
import UserDetails from "@/components/blocks/UserDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "./not_found";
import useLocalStorage from "@/components/store/localStorage";

const Loading = () => {
  return (
    <div className="w-full min-h-[700px] flex justify-center items-center bg-black">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default function Page() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const { isLoading } = useLocalStorage();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/api/user/${id}`);
        console.log(response?.data?.data[0])
        setUserData(response?.data?.data[0]);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  if (!userData || isLoading) {
    return <Loading />;
  }

  return userData ? (
    <div>
      <div className="min-h-[700px] relative">
        <ProfileBanner
          name={`/uploads/${userData?.fullname}`}
          wallpic={`/uploads/${userData?.profile}`}
          profile={`/uploads/${userData?.profile}`}
        />
        <UserDetails name={userData?.fullname || id} />
      </div>
    </div>
  ) : (
    <NotFound />
  );
}
