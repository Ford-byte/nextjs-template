"use client";
import { useState } from "react";
import Image from "next/image";
import ImagePopup from "../popups/ImagePopup";
import Close from "@/public/icons/close";
import useLocalStorage from "../store/localStorage";
import AddImagePopup from "../popups/addImagePopup";

export default function ProfileBanner({ wallpic, profile }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [addImagePopup, setAddImagePopup] = useState(false);
  const { isLogged } = useLocalStorage();

  const popUptoggle = () => {
    setAddImagePopup((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center min-h-[400px] lg:min-h-[450px]">
      {wallpic ? (
        <div className="w-full h-[300px] relative">
          <Image
            src={wallpic}
            width={1920}
            height={900}
            alt="Profile Banner"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(wallpic)}
          />
          {isLogged && (
            <div
              className="absolute bottom-0 right-4 lg:right-12 bg-gray-100 p-2 rounded-full cursor-pointer translate-y-1/2"
              onClick={popUptoggle}
            >
              <Close className="size-6 lg:size-12 rotate-45" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full min-h-[300px] lg:min-h-[400px] bg-gray-500 animate-pulse"></div>
      )}

      <div className="absolute flex justify-center w-fit rounded-full translate-y-[100%] lg:translate-y-1/2">
        {profile ? (
          <div className="relative">
            <Image
              src={profile}
              width={300}
              height={300}
              alt="Profile Picture"
              className="size-[200px] lg:size-[300px] rounded-full object-cover cursor-pointer"
              onClick={() => setSelectedImage(profile)}
            />
            {isLogged && (
              <div
                className="absolute bottom-6 lg:bottom-8 right-0 bg-gray-100 p-2 rounded-full cursor-pointer"
                onClick={popUptoggle}
              >
                <Close className="size-6 lg:size-12 rotate-45" />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-black size-[200px] lg:size-[300px] rounded-full" />
        )}
      </div>

      {selectedImage && (
        <ImagePopup
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      {addImagePopup && <AddImagePopup toggle={popUptoggle} />}
    </div>
  );
}
