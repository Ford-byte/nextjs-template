"use client";
import { useState } from "react";
import Image from "next/image";
import ImagePopup from "../popups/ImagePopup";

export default function ProfileBanner({ wallpic, profile }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="relative flex flex-col items-center min-h-[400px] lg:min-h-[450px]">
      {wallpic ? (
        <Image
          src={wallpic}
          width={1920}
          height={900}
          alt="Profile Banner"
          className="w-full h-[300px] object-cover pointer"
          onClick={() => setSelectedImage(wallpic)}
        />
      ) : (
        <div className="w-full min-h-[300px] lg:min-h-[400px] bg-gray-500 animate-pulse"></div>
      )}
      <div className="absolute flex justify-center w-fit rounded-full translate-y-[100%] lg:translate-y-1/2">
        {profile ? (
          <Image
            src={profile}
            width={300}
            height={300}
            alt="Profile Picture"
            className="size-[200px] lg:size-[300px] rounded-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(profile)}
          />
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
    </div>
  );
}
