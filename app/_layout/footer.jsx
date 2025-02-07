import ContactButton from "@/public/icons/contact";
import Email from "@/public/icons/email";
import Facebook from "@/public/icons/facebook";
import Locationpin from "@/public/icons/locationpin";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-black min-h-[400px] text-white flex-col ">
      <div className="container ">
        <div className="py-[24px] flex items-center flex-col">
          <address className="w-full flex flex-col items-center text-white not-italic">
            <div className="container flex flex-col lg:flex-row justify-evenly w-full gap-y-3 lg:gap-x-6">
              <div className="flex gap-2 items-center">
                <Locationpin className="size-6 text-white" />
                <p className="text-sm">Datag, Buagsong Cordova</p>
              </div>
              <div className="flex gap-2 items-center">
                <ContactButton className="size-6 text-white" />
                <p className="text-sm">09324150079</p>
              </div>
              <div className="flex gap-2 items-center">
                <Email className="size-6 text-white" />
                <p className="text-sm">eclipsefitnessofficial@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <Facebook className="size-6 text-white" />
                <p className="text-sm">@eclipsefitness</p>
              </div>
            </div>
          </address>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center py-[62px]">
        <div className="absolute z-[1]">
          <Image
            src="/favicon.ico"
            width={100}
            height={100}
            alt="logo"
            className="object-contain"
          />
        </div>
        <div className="flex items-center w-full border border-gray-300 z-[0]"></div>
      </div>
      <div className="px-[16px] lg:px-0 py-[24px]">
        <p className="text-center">
          2024 - Eclipse Fitness. All Rights Reserved
        </p>
        <p className="text-center">
          Website Design & Development: Eclipse IT Department | Management Team:
          Eclipse Fitness Operations Team
        </p>
      </div>
    </footer>
  );
}
