import LoginForm from "@/components/forms/loginForm";
import useLocalStorage from "@/components/store/localStorage";
import Close from "@/public/icons/close";

export default function Login() {
  const { showLogin, setShowLogin } = useLocalStorage();

  const closeForm = () => {
    setShowLogin(!showLogin);
  };
  return (
    <div
      className={`z-[1001] fixed right-0 top-0 w-[500px] flex-col h-full bg-white ${
        showLogin ? "flex" : "hidden"
      }`}
    >
      <div className="relative w-full flex justify-end p-4">
        <Close className={`size-8`} onClick={closeForm} />
      </div>
      <LoginForm />
    </div>
  );
}
