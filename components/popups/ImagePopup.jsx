import { useEffect } from "react";
import Image from "next/image";
import Close from "@/public/icons/close";

export default function ImagePopup({ image, onClose }) {
  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!image) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[10]"
      onClick={onClose}
    >
      <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
          aria-label="Close image popup"
        >
          <Close className="size-6" />
        </button>

        <Image
          src={image}
          width={500}
          height={500}
          alt="Displayed image"
          className="max-w-full max-h-[80vh] object-cover rounded-lg z-[11]"
        />
      </div>
    </div>
  );
}
