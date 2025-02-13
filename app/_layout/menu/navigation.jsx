"use client";
import useLocalStorage from "@/components/store/localStorage";
import Bars from "@/public/icons/bars";
import Close from "@/public/icons/close";
import Power from "@/public/icons/power";
import User from "@/public/icons/user";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginForm = dynamic(() => import("./login"), { ssr: false });

export default function Navigation() {
  const router = useRouter();

  const navigators = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Training", link: "/training" },
  ];

  const { showLogin, setShowLogin, isLogged, setLog } = useLocalStorage();
  const [isOpen, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!isOpen);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  const handleLogout = () => {
    setTimeout(() => {
      router.push("/");
      setLog(false);
    }, 2000);
  };

  return (
    <div id="menu" className="relative">
      <div className="hidden lg:flex gap-x-[24px] items-center">
        {navigators.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="secondary-button font-tommy uppercase"
          >
            {item.title}
          </Link>
        ))}
        {!isLogged ? (
          <button
            className="primary-button font-tommy uppercase tracking-widest"
            onClick={handleLoginClick}
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <Link href={`/profile`}>
              <User className="size-[50px] cursor-pointer" />
            </Link>
            <div className="absolute hidden group-hover:block bg-white py-3 px-6 text-black rounded-md shadow-lg pointer-events-auto">
              <div
                className="flex items-center gap-x-3 cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                <Power className="size-6" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex lg:hidden">
        <Bars className="size-6" onClick={toggleSidebar} />
      </div>

      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-[75%] bg-white h-full z-[1] flex flex-col py-[24px]">
            <span className="absolute top-4 right-4">
              <Close className="size-6" onClick={toggleSidebar} />
            </span>
            <div className="container text-black flex flex-col gap-4 items-center">
              {navigators.map((item, index) => (
                <Link href={item.link} key={index} className="secondary-button">
                  {item.title}
                </Link>
              ))}
              <button className="primary-button" onClick={handleLoginClick}>
                Login
              </button>
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
  );
}
