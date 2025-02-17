"use client";

import apiClient from "@/app/axios";
import Close from "@/public/icons/close";
import { useState } from "react";

export default function AddImagePopup({ toggle }) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("id", localStorage.getItem("user_id"));
      formData.append("file", file);

      const response = await apiClient.post(`/api/user/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("Error occurred.", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[20] full-center text-white bg-black bg-opacity-80 w-full h-full flex flex-col items-center justify-center">
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg relative">
        <button className="flex float-right p-4 rounded-full" onClick={toggle}>
          <Close className={`size-6`} />
        </button>
        <form onSubmit={submitProfile}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-md p-2"
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Preview"
                className="w-[300px] h-[300px] rounded-lg object-cover center my-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-center py-2 font-bold tracking-widest rounded-md shadow-lg my-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
