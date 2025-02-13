"use client";

import useLocalStorage from "@/components/store/localStorage";
import Error from "./error";
import ProfileBanner from "@/components/blocks/ProfileBanner";
import UserDetails from "@/components/blocks/UserDetails";

export default function Page() {
  const { isLogged, isLoading } = useLocalStorage();

  const Loading = () => {
    return (
      <div className="w-full min-h-[700px] center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  };

  if (!isLoading) {
    return <Loading />;
  }

  return isLogged ? (
    <div className="min-h-[700px] relative">
      <ProfileBanner
        name={`Rex`}
        wallpic={`/images/rex.webp`}
        profile={`/images/rex.webp`}
      />
      <UserDetails name={`Rex`} />
    </div>
  ) : (
    <Error />
  );
}
