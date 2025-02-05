import Logo from "./menu/logo";
import Navigation from "./menu/navigation";

export default function Header() {
  return (
    <header className="relative center bg-gray-200">
      <div className="w-full h-[100px] flex items-center justify-between container">
        <div>
          <Logo />
        </div>
        <div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
