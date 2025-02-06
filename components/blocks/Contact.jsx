import Image from "next/image";
import ContactForm from "../forms/contactForm";
import ContactButton from "@/public/icons/contact";
import Email from "@/public/icons/email";
import Facebook from "@/public/icons/facebook";
import Locationpin from "@/public/icons/locationpin";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#372F2F] text-white relative min-h-[700px]"
    >
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
        <section className="flex flex-col items-center px-4 py-16 relative">
          <div className="w-full max-w-xl py-6">
            <ContactForm />
          </div>

          <address className="w-full flex flex-col items-center mt-8 text-white not-italic">
            <div className="container flex flex-col sm:flex-row justify-evenly w-full gap-y-3 lg:gap-x-6">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <Locationpin className="size-6 text-white" />
                  <p className="text-sm">Datag, Buagsong Cordova</p>
                </div>
                <div className="flex gap-2 items-center">
                  <ContactButton className="size-6 text-white" />
                  <p className="text-sm">09324150079</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <Email className="size-6 text-white" />
                  <p className="text-sm">eclipsefitnessofficial@gmail.com</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Facebook className="size-6 text-white" />
                  <p className="text-sm">@eclipsefitness</p>
                </div>
              </div>
            </div>
          </address>
        </section>
      </div>
    </section>
  );
}
