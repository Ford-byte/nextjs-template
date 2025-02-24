"use client";
import { useEffect } from "react";
import Image from "next/image";
import useLocalStorage from "../store/localStorage";
import Link from "next/link";

export default function Banner(props) {
  const { showLazy, setShowLazy, showLogin, setShowLogin, isLogged } =
    useLocalStorage();

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !showLazy) {
        setShowLazy(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showLazy, setShowLazy]);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        {props?.image ? (
          <picture>
            <Image
              src={props?.image}
              fill
              style={{ objectFit: "cover" }}
              priority
              alt="Background"
              className="object-cover"
            />
          </picture>
        ) : (
          <Image
            src="/images/not_found.png"
            layout="fill"
            objectFit="contain"
            alt="Background"
            className="object-contain"
          />
        )}
      </div>

      <div className="container text-[18px]">
        {props?.header && (
          <h2 className="font-[600] text-5xl lg:text-7xl max-w-[900px] font-tommy">
            {props?.header || "Header"}
          </h2>
        )}

        <div className="space-x-[12px] text-xs lg:text-lg pt-[36px]">
          {props?.buttons?.button && (
            <Link
              href={props?.buttons?.link}
              className="primary-button pointer"
            >
              {props?.buttons?.button}
            </Link>
          )}

          {!isLogged && (
            <span
              className="tertiary-button pointer text-xs lg:text-lg"
              onClick={toggleLogin}
            >
              Login
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
