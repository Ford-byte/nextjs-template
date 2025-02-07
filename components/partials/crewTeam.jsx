"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CrewTeam() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
      <div className="h-[400px] relative group shadow-2xl">
        <Image
          src={`/images/kurt.webp`}
          width={300}
          height={300}
          alt="profile"
          className="w-full h-full object-fill"
        />
        <span className="absolute inset-0 text-white flex items-center justify-between bg-black/90 px-[16px] transition-all duration-500 opacity-0 group-hover:opacity-100 h-0 group-hover:h-[100px] transform">
          <h3 className="text-2xl uppercase">Kurt</h3>
          <Link href={`/coach/kurt`} className="pointer">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </Link>
        </span>
      </div>
      <div className="h-[400px] relative group shadow-2xl">
        <Image
          src={`/images/frenand.webp`}
          width={300}
          height={300}
          alt="profile"
          className="w-full h-full object-fill"
        />
        <span className="absolute inset-0 text-white flex items-center justify-between bg-black/90 px-[16px] transition-all duration-500 opacity-0 group-hover:opacity-100 h-0 group-hover:h-[100px] transform">
          <h3 className="text-2xl uppercase">FRENAND</h3>
          <Link href={`/coach/frenand`} className="pointer">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </Link>
        </span>
      </div>
      <div className="h-[400px] relative group shadow-2xl">
        <Image
          src={`/images/rex.webp`}
          width={300}
          height={300}
          alt="profile"
          className="w-full h-full object-fill"
        />
        <span className="absolute inset-0 text-white flex items-center justify-between bg-black/90 px-[16px] transition-all duration-500 opacity-0 group-hover:opacity-100 h-0 group-hover:h-[100px] transform">
          <h3 className="text-2xl uppercase">Rex</h3>
          <Link href={`/coach/rex`} className="pointer">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </Link>
        </span>
      </div>
    </section>
  );
}
