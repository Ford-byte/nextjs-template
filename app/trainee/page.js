"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    if (storedName) {
      setFullname(storedName);
    }
  }, []);

  return (
    <div className="pt-[100px]">
      <div className="grid grid-cols-3 gap-12 min-h-[600px] p-12">
        <div className="bg-gray-200 flex h-full p-4">
          <Image
            src={`/`}
            width={200}
            height={200}
            alt="profile"
            className="h-[200px] w-[200px] object-cover bg-gray-500 animate-pulse"
          />
          <div className="flex flex-col pl-4">
            <h2>
              <strong>Name:</strong> {fullname || "No name set"}
            </h2>
            <h2>
              <strong>Training:</strong> {"Hiit"}
            </h2>
          </div>
        </div>
        <div className="bg-gray-200 flex h-full">2</div>
        <div className="bg-gray-200 flex h-full">3</div>
      </div>
    </div>
  );
}
