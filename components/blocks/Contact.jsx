import Image from "next/image";
import ContactForm from "../forms/contactForm";

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
        </section>
      </div>
    </section>
  );
}
