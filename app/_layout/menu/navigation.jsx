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
      title: "Training",
      link: "/training",
    },
    {
      title: "Login",
      link: "/",
    },
  ];

  return (
    <div id="menu" className="relative">
      <div className="hidden lg:flex gap-x-[24px]">
        {navigators?.map((item, index) => {
          return (
            <Link
              href={item?.link}
              key={index}
              className={
                item?.title === "Login" ? "primary-button" : "secondary-button"
              }
              id={item?.title}
            >
              {item?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
