"use client";
import { useState, useEffect } from "react";
import Paperplane from "@/public/icons/paperplane";
import apiClient from "@/app/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
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
        toast.success(response?.data?.message || "Message sent successfully!");
        setFormData({ fullname: "", email: "", contact: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send the message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-y-8 z-[1]">
      <div className="text-center">
        <h2 className="text-6xl font-bold tracking-wider">GET IN TOUCH</h2>
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
