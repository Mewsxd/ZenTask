import { FormEvent, useRef } from "react";

const AuthPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !nameRef.current?.value ||
      emailRef.current?.value ||
      passwordRef.current?.value
    ) {
      return alert("All fields must be filled");
    }
  }
  return (
    <div className="w-[100%] flex flex-col justify-center items-center h-dvh">
      <form
        className="form w-[22.5%] flex flex-col gap-2 p-4 rounded"
        onSubmit={formSubmitHandler}
      >
        <label className="input font-inter text-2xl text-[#3F292B] font-semibold px-1 py-[10px] outline-none rounded w-full">
          Sign in to ZenTask
        </label>
        <input
          type="text"
          placeholder="name"
          ref={nameRef}
          className="input font-inter px-3 py-[10px] text-[#3F292B] outline-none border rounded w-full"
        />
        <input
          type="email"
          placeholder="email"
          ref={emailRef}
          className="input font-inter px-3 py-[10px] text-[#3F292B] outline-none border rounded w-full"
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="password"
          className="input font-inter px-3 py-[10px] text-[#3F292B] outline-none border rounded w-full"
        />
        <button
          type="submit"
          className="font-inter w-full px-3 py-[10px]  outline-none border rounded bg-[#D34F73] text-white"
        >
          Sign Up
        </button>
        <label className="input font-inter px-1 py-[10px] text-[#3F292B] outline-none rounded w-full">
          Already have an account?
        </label>
        <button className="font-inter w-fit px-5 py-[10px]  outline-none border rounded bg-[#D34F73] text-white">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
