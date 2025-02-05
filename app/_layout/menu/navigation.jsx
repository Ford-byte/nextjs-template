import Link from "next/link";

export default function Navigation() {
  const navigators = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  return (
    <div id="menu" className="relative">
      <div className="flex gap-x-[36px]">
        {navigators?.map((item, index) => {
          return (
            <Link href={item?.link} key={index} className="primary-button">
              {item?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
