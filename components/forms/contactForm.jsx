"use client";
import { useState, useEffect } from "react";
import Paperplane from "@/public/icons/paperplane";
import apiClient from "@/app/axios";
import Toast from "../popups/toast";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toastData, setToastData] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    message: "",
  });

  useEffect(() => {
    let timer;
    if (formSubmitted) {
      timer = setTimeout(() => setFormSubmitted(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [formSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/api/send/toEmail`, {
        ...formData,
        subject: "Concerns",
      });

      if (response?.status === 200) {
        setFormSubmitted(true);
        setToastData({
          status: response?.status,
          message: response?.data?.message || "Form submitted successfully!",
        });

        setTimeout(() => {
          setFormData({ fullname: "", email: "", contact: "", message: "" });
        }, 2000);
      }
    } catch (error) {
      setToastData({
        status: 500,
        message: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-8 z-[1]">
      <div className="text-center">
        <h2 className="text-6xl font-bold tracking-wider font-[Cairo] ">
          GET IN TOUCH
        </h2>
        <h3 className="text-xs text-gray-200">Contact Us</h3>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {["fullname", "email", "contact", "message"].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={field} className="font-medium capitalize">
              {field.replace("contact", "Contact Number")}:
            </label>
            {field === "message" ? (
              <textarea
                id={field}
                name={field}
                rows="4"
                className="p-3 text-black border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder={`${field.replace("message", "Message")}*`}
                required
                value={formData[field]}
                onChange={handleChange}
              ></textarea>
            ) : (
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "contact"
                    ? "tel"
                    : "text"
                }
                id={field}
                name={field}
                pattern={field === "contact" ? "[0-9]{9,15}" : undefined}
                className="py-2 px-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`${
                  field === "fullname"
                    ? "Fullname"
                    : field === "email"
                    ? "Email"
                    : field === "contact"
                    ? "Contact Number"
                    : ""
                }*`}
                required
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition float-right"
        >
          Send <Paperplane className="size-6 fill-white" />
        </button>
      </form>

      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}
    </div>
  );
}
