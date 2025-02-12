import Logo from "./menu/logo";
import Navigation from "./menu/navigation";
import Login from "./menu/login";

export default function Header() {
  return (
    <header className="fixed z-[1000] center bg-blue-500/50 text-white">
      <div className="w-full h-[100px] flex items-center justify-between container">
        <div>
          <Logo />
        </div>
        <div>
          <Navigation />
        </div>
      </div>
      <Login />
    </header>
  );
}
