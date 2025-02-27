"use client";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import useLocalStorage from "@/components/store/localStorage";
import Bars from "@/public/icons/bars";
import Close from "@/public/icons/close";
import Power from "@/public/icons/power";
import User from "@/public/icons/user";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/app/axios";
import useApiStorage from "@/components/store/api";

const LoginForm = dynamic(() => import("./login"), { ssr: false });

function Navigation() {
  const { showLogin, setShowLogin, isLogged, setLog } = useLocalStorage();
  const { getUserData } = useApiStorage();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [access, setAccess] = useState([]);
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id"));

  const { data, error, isLoading } = useSWR(
    userId ? `/api/user/permissions/permissions?user_id=${userId}` : null,
    apiClient.get
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserData();
      } catch (error) {
        console.log("Failed to fetch user:", error);
      }
    };

    fetchUser();

    if (data) {
      const permissionKeywords =
        data?.data?.data?.map((item) => item.keyword) || [];
      localStorage.setItem("accessControl", JSON.stringify(permissionKeywords));
      setAccess(permissionKeywords);
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.clear();
    setLog(false);
    router.push("/");
  };

  const roleLinks = {
    "view:dashboard": { href: "/dashboard", label: "Dashboard" },
    "view:session": { href: "/session", label: "Sessions" },
    "view:trainee": { href: "/trainee", label: "Trainee" },
    "view:trainers": { href: "/trainers", label: "Coaches" },
  };

  const renderRoleSpecificLinks = () =>
    access
      .filter((item) => roleLinks[item])
      .map((item) => (
        <Link
          href={roleLinks[item].href}
          className="secondary-button uppercase"
          key={item}
        >
          {roleLinks[item].label}
        </Link>
      ));

  const handleLoginClick = () => setShowLogin(!showLogin);
  const toggleSidebar = () => setOpen(!isOpen);
  const handleLinkClick = () => setOpen(false);

  const navigators = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Training", link: "/training" },
  ];

  return (
    <Suspense fallback={<div className="loading-spinner"></div>}>
      <div id="menu" className="relative">
        <div className="hidden lg:flex gap-x-[24px] items-center">
          {navigators.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="secondary-button font-tommy uppercase tracking-in-expand"
              onClick={handleLinkClick}
            >
              {item.title}
            </Link>
          ))}
          {renderRoleSpecificLinks()}
          {isLoading ? (
            <div className="size-[50px] rounded-full bg-gray-200 animate-pulse"></div>
          ) : isLogged ? (
            <div className="relative group">
              <Link href="/profile">
                <User className="size-[50px] cursor-pointer" />
              </Link>
              <div className="absolute hidden group-hover:block bg-white py-3 px-6 text-black rounded-md shadow-lg pointer-events-auto">
                <div
                  className="flex items-center gap-x-3 cursor-pointer"
                  onClick={handleLogout}
                >
                  <Power className="size-6" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="primary-button font-tommy uppercase tracking-widest"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
        </div>

        <div className="flex lg:hidden">
          <Bars className="size-6" onClick={toggleSidebar} />
        </div>

        {isOpen && (
          <>
            <div className="fixed top-0 left-0 w-[75%] bg-white h-full z-[1] flex flex-col py-[24px]">
              <span className="absolute top-4 right-4">
                <Close
                  className="size-6"
                  onClick={toggleSidebar}
                  aria-label="Close Menu"
                />
              </span>
              <div className="container text-black flex flex-col gap-4 items-center">
                {navigators.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="secondary-button tracking-in-expand"
                    onClick={handleLinkClick}
                  >
                    {item.title}
                  </Link>
                ))}
                {renderRoleSpecificLinks()}
                {!isLogged && (
                  <button className="primary-button" onClick={handleLoginClick}>
                    Login
                  </button>
                )}
              </div>
            </div>
            <div
              className="w-full h-full bg-black/50 fixed inset-0 z-[0]"
              onClick={toggleSidebar}
            />
          </>
        )}
        <LoginForm />
      </div>
    </Suspense>
  );
}

export default Navigation;
