import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <div>
      <Link href={`/`}>
        <Image
          src={`/favicon.ico`}
          width={100}
          height={100}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}
