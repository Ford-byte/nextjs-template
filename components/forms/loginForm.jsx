"use client";
import Google from "@/public/icons/google";
import { useState } from "react";
import apiClient from "@/app/axios";
import useLocalStorage from "../store/localStorage";
import Toast from "../popups/toast";

export default function LoginForm({ changeForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLog } = useLocalStorage();
  const [toastData, setToastData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/user/login", {
        username,
        password,
      });

      setToastData({ status: response?.status, message: "Login successful!" });
      setTimeout(() => {
        setLog(true);
      }, 1000);
      setUsername("");
      setPassword("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setToastData({ status: 400, message: errorMessage });
    }
  };

  return (
    <div id="loginform" className="relative center px-4 py-6 text-black">
      <div className="container">
        <h2 className="text-5xl font-semibold text-center">WELCOME</h2>
        <h3 className="text-center text-xs">to Eclipse Fitness Gym</h3>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 shadow-md my-3 mx-auto px-3 flex flex-col items-center"
        >
          <h2 className="italic text-3xl text-center py-6">ECLIPSE</h2>
          <div className="flex flex-col gap-y-3 w-full px-8 pb-6">
            <input
              type="text"
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Phone number, username or email"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Log in
            </button>
          </div>

          <div className="flex justify-center items-center relative w-full">
            <div className="border-gray-500 w-full border" />
            <p className="px-3">OR</p>
            <div className="border-gray-500 w-full border" />
          </div>

          <div className="py-6 flex gap-x-3 group cursor-pointer">
            <span>
              <Google className="w-6 h-6" />
            </span>
            <p className="group-hover:underline">Login with GMAIL</p>
          </div>
        </form>

        <div className="bg-gray-200 rounded-sm px-3 py-6 flex gap-x-3 justify-center">
          <div>Doesn't Have an Account?</div>
          <p
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => changeForm?.()}
          >
            Create an Account
          </p>
        </div>
      </div>

      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}
    </div>
  );
}
