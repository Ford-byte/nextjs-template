"use client";

import useLocalStorage from "@/components/store/localStorage";
import Close from "@/public/icons/close";
import dynamic from "next/dynamic";
import { useState } from "react";

const LoginForm = dynamic(() => import("@/components/forms/loginForm"), {
  ssr: false,
});
const RegistrationForm = dynamic(
  () => import("@/components/forms/registrationForm"),
  { ssr: false }
);

export default function Login() {
  const { showLogin, setShowLogin, isLogged } = useLocalStorage();
  const [isOpen, setOpen] = useState(true);

  if (isLogged) return null;

  return (
    <div
      className={`z-[1001] fixed right-0 top-0 w-[500px] hidden lg:flex flex-col h-full bg-white ${
        showLogin ? "slide-in-right" : "slide-out-right"
      }`}
    >
      <div className="relative w-full flex justify-end p-4">
        <Close
          className="size-8 fill-black cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </div>
      {isOpen ? (
        <LoginForm changeForm={() => setOpen((prev) => !prev)} />
      ) : (
        <RegistrationForm changeForm={() => setOpen((prev) => !prev)} />
      )}
    </div>
  );
}
