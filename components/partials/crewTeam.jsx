"use client";

import Image from "next/image";
import Link from "next/link";
import useApiStorage from "../store/api";
import { useEffect, useState, useCallback } from "react";

export default function CrewTeam() {
  const { getTrainerData } = useApiStorage();
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getTrainerData();
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching trainer data:", error);
    }
  }, [getTrainerData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {data.length > 0 ? (
        data.map((item, index) => (
          <figure className="relative group shadow-2xl h-[400px]" key={index}>
            <Image
              src={`/uploads/${item?.profile}` || "/default-profile.jpg"}
              width={300}
              height={300}
              alt={item?.fullname || "Trainer Profile"}
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute inset-0 flex items-center justify-between bg-black/90 text-white px-4 opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-[100px]">
              <h3 className="text-2xl uppercase">
                {item?.fullname || "Unknown"}
              </h3>
              <Link
                aria-label={`View profile of ${item?.fullname || "Trainer"}`}
                href={`/trainer/${item?.fullname || "#"}`}
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </Link>
            </figcaption>
          </figure>
        ))
      ) : (
        <figure className="relative group shadow-2xl h-[400px] bg-gray-200 animate-pulse">
          <Image
            src={"/default-profile.jpg"}
            width={300}
            height={300}
            alt={"Trainer Profile"}
            className="w-full h-full object-cover"
          />
          <figcaption className="absolute inset-0 flex items-center justify-between bg-black/90 text-white px-4 opacity-0 group-hover:opacity-100 transition-all duration-500 h-0 group-hover:h-[100px]">
            <h3 className="text-2xl uppercase">{"Unknown"}</h3>
            <Link
              aria-label={`View profile of ${"Trainer"}`}
              href={`/trainer/${"#"}`}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8 pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </Link>
          </figcaption>
        </figure>
      )}
    </section>
  );
}
