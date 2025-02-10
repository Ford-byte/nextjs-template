"use client";
import Bars from "@/public/icons/bars";
import Close from "@/public/icons/close";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const navigators = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Training",
      link: "/training",
    },
    {
      title: "Login",
      link: "/",
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!isOpen);
  };
  return (
    <div id="menu" className="relative">
      <div className="hidden lg:flex gap-x-[24px]">
        {navigators?.map((item, index) => {
          return (
            <Link
              href={item?.link}
              key={index}
              className={
                item?.title === "Login" ? "primary-button" : "secondary-button"
              }
              id={item?.title}
            >
              {item?.title}
            </Link>
          );
        })}
      </div>
      <div className="flex lg:hidden">
        <Bars className={`size-6`} onClick={toggleSidebar} />
      </div>
      <div
        className={`fixed ${
          isOpen ? "flex" : "hidden"
        } lg:hidden top-0 left-0 w-[75%] bg-white h-full z-[1]`}
      >
        <div className="center py-[24px]">
          <div className="container text-black">
            <span className="absolute top-4 right-4">
              <Close className={`size-6`} onClick={toggleSidebar} />
            </span>
            <div className="flex flex-col py-[24px]">
              {navigators?.map((item, index) => {
                return (
                  <Link
                    href={item?.link}
                    key={index}
                    className={`text-center ${
                      item?.title === "Login"
                        ? "primary-button"
                        : "secondary-button"
                    }`}
                    id={item?.title}
                  >
                    {item?.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-full bg-black/50 fixed inset-0 z-[0] lg:hidden ${
          isOpen ? "flex" : "hidden"
        }`}
        onClick={toggleSidebar}
      />
    </div>
  );
}
