"use client";
import apiClient from "@/app/axios";
import Google from "@/public/icons/google";
import { useState } from "react";
import Toast from "../popups/toast";

export default function RegistrationForm({ changeForm }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [toastData, setToastData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email address";
    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await apiClient.post("/api/user", formData);

      if (!response || !response.status || response.status >= 400) {
        return toast.error(response.data?.message || "Something went wrong");
      }

      setToastData({
        status: response?.status,
        message: response?.data?.message,
      });

      setFormData({
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setToastData({
        status: 500,
        message: error.response?.data?.message,
      });
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google Sign Up Clicked");
  };

  return (
    <div
      id="registration-form"
      className="relative center px-4 py-6 text-black"
    >
      <div className="container">
        <h2 className="text-5xl font-semibold text-center">Sign Up</h2>
        <h3 className="text-center text-xs">Join Eclipse Fitness Gym</h3>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 shadow-md my-4 mx-auto px-4 py-6 flex flex-col items-center"
        >
          <h2 className="italic text-3xl text-center py-6">ECLIPSE</h2>

          <div className="flex flex-col gap-y-3 w-full px-8 pb-6">
            {Object.keys(errors).map((key) => (
              <p key={key} className="text-red-500 text-sm">
                {errors[key]}
              </p>
            ))}
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Email"
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="py-3 w-full px-3 font-extralight text-black focus:outline-gray-300"
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-center items-center relative w-full">
            <div className="border-gray-500 w-full border" />
            <p className="px-3">OR</p>
            <div className="border-gray-500 w-full border" />
          </div>

          <div
            className="py-6 flex gap-x-3 group cursor-pointer"
            onClick={handleGoogleSignup}
          >
            <span>
              <Google className="size-6" />
            </span>
            <p className="group-hover:underline">Sign up with Google</p>
          </div>
        </form>

        <div className="bg-gray-200 rounded-sm px-4 py-6 flex gap-x-3 justify-center">
          <div>Already have an account?</div>
          <p
            className="text-green-500 hover:underline cursor-pointer"
            onClick={changeForm}
          >
            Log in
          </p>
        </div>
      </div>

      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}
    </div>
  );
}
