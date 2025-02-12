"use client";

import useLocalStorage from "@/components/store/localStorage";
import Close from "@/public/icons/close";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LoginForm = dynamic(() => import("@/components/forms/loginForm"), {
  loading: () => <div>Loading...</div>,
});
const RegistrationForm = dynamic(
  () => import("@/components/forms/registrationForm"),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default function Login() {
  const { showLogin, setShowLogin, isLogged } = useLocalStorage();
  const [isOpen, setOpen] = useState(true);

  const changeForm = () => {
    setOpen((prev) => !prev);
  };

  const closeForm = () => {
    setShowLogin(false);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  // useEffect(() => {
  //   if (!showLogin) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [showLogin]);

  return !isLogged ? (
    <div
      className={`z-[1001] fixed right-0 top-0 w-[500px] flex-col h-full bg-white ${
        showLogin ? "slide-in-right" : "slide-out-right"
      }`}
    >
      <div className="relative w-full flex justify-end p-4">
        <Close
          className="size-8 fill-black cursor-pointer"
          onClick={closeForm}
        />
      </div>
      {isOpen ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegistrationForm changeForm={changeForm} />
      )}
    </div>
  ) : null;
}
