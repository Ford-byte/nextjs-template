import Image from "next/image";
import ContactForm from "../forms/contactForm";
import Locationpin from "@/public/icons/locationpin";
import ContactButton from "@/public/icons/contact";
import Email from "@/public/icons/email";
import Facebook from "@/public/icons/facebook";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#372F2F] text-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex">
          <Image
            src={`/images/bg_contact.jpg`}
            width={700}
            height={700}
            alt="background_image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="center px-[16px] py-[100px] relative">
          <ContactForm />
          <div className="absolute inset-0 flex justify-center items-end p-3 w-full">
            <div className="container relative flex w-full justify-between flex-wrap">
              <div className="flex gap-1 items-center" aria-label="Location">
                <Locationpin className="size-8 text-white" />
                <p className="text-xs">Datag, Buagsong Cordova</p>
              </div>
              <div className="flex gap-1 items-center" aria-label="Location">
                <ContactButton className="size-6 text-white" />
                <p className="text-xs">09324150079</p>
              </div>
              <div className="flex gap-1 items-center" aria-label="Location">
                <Email className="size-6 text-white" />
                <p className="text-xs">eclipsefitnessofficial@gmail.com</p>
              </div>
              <div className="flex items-center" aria-label="Location">
                <Facebook className="size-6 text-white" />
                <p className="text-xs">@eclipsefitness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
