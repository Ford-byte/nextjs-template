"use client";
import Google from "@/public/icons/google";
import { useState, useEffect } from "react";
import useLocalStorage from "../store/localStorage";
import Toast from "../popups/toast";
import accessControl from "@/app/accessControl";
import useApiStorage from "../store/api";

export default function LoginForm({ changeForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLog } = useLocalStorage();
  const [process, setProcess] = useState(false);
  const { userLogin, toastData } = useApiStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcess(true);
    try {
      const response = await userLogin({
        username: username,
        password: password,
      });

      const userData = response?.data?.data[0];

      if (response?.success === false) {
        return;
      }

      localStorage.setItem(
        "userData",
        JSON.stringify({
          user_id: userData?.user_id,
          fullname: userData?.fullname,
          email: userData?.email,
        })
      );

      localStorage.setItem("user_id", userData?.user_id);
      localStorage.setItem("fullname", userData?.fullname);
      localStorage.setItem("email", userData?.email);
      localStorage.setItem("role", userData?.role);

      accessControl(userData?.user_id).then((permissions) => {
        if (permissions && permissions.length > 0) {
          const permissionKeywords = permissions.map((item) => item.keyword);
          localStorage.setItem(
            "accessControl",
            JSON.stringify(permissionKeywords)
          );
        } else {
          console.log("No permissions found.");
        }
      });

      setTimeout(() => {
        setLog(true);
        window.location.reload();
      }, 1000);

      setUsername("");
      setPassword("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
    } finally {
      setTimeout(() => {
        setProcess(false);
      }, 1000);
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
              {process ? "Logging in" : "Log in"}
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
