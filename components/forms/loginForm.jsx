export default function LoginForm() {
  return (
    <div id="loginform" className="relative center px-[16px] py-[24px]">
      <div className="container">
        <h2 className="text-5xl font-[600] text-center">WELCOME</h2>
        <h3 className="text-center text-xs">to eclipse fitness gym</h3>

        <form
          action="/"
          method="post"
          className="bg-gray-200 shadow-md my-[12px] mx-auto px-[12px] flex flex-col items-center"
        >
          <h2 className="italic text-3xl text-center py-[24px]">ECLIPSE</h2>
          <div className="flex flex-col gap-y-[12px] w-full px-[32px] pb-[24px]">
            <input
              type="text"
              className="py-[12px] w-full  px-[12px] font-extralight text-black focus:outline-gray-300"
              placeholder="Phone number, username or email"
            />
            <input
              type="text"
              className="py-[12px] w-full  px-[12px] font-extralight text-black focus:outline-gray-300"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-full py-[12px] bg-blue-500 text-white font-[600] rounded-lg"
            >
              Log in
            </button>
          </div>

          <div className="flex justify-center items-center relative w-full">
            <div className="border-gray-500 w-full border" />
            <p className="px-[12px]">OR</p>
            <div className="border-gray-500 w-full border" />
          </div>

          <div className="py-[24px]">
            <span></span>
            Login with GMAIL
          </div>
        </form>
      </div>
    </div>
  );
}
