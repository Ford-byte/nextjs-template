"use client";
import { useState } from "react";
import Paperplane from "@/public/icons/paperplane";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formToggle = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="text-center">
        <h2 className="text-6xl font-bold tracking-wider">GET IN TOUCH</h2>
        <h3 className="text-xs text-gray-200">Contact Us</h3>
      </div>
      {formSubmitted ? (
        <div className="p-4 text-center bg-green-200 text-green-800 rounded-md">
          Thank you for reaching out! We will get back to you soon.
        </div>
      ) : (
        <form
          action="/"
          method="post"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            formToggle();
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="font-medium">
              Full Name:
            </label>
            <input
              type="text"
              id="fullname"
              className="py-2 px-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name*"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="py-2 px-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email*"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="number" className="font-medium">
              Contact Number:
            </label>
            <input
              type="tel"
              id="number"
              pattern="[0-9]{9,15}"
              className="py-2 px-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contact Number*"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-medium">
              Message:
            </label>
            <textarea
              id="message"
              cols="30"
              rows="4"
              className="p-3 text-black border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message*"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition float-right"
          >
            Send <Paperplane className="size-6 fill-white" />
          </button>
        </form>
      )}
    </div>
  );
}
