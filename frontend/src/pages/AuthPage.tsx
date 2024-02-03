import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  async function loginFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailRef.current?.value) {
      return alert("Please give us your email id");
    }
    if (!passwordRef.current?.value) {
      return alert("Please give us your password");
    }
    const reqBody = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    try {
      const request = await fetch(`http://localhost:8000/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const response = await request.json();
      console.log(response);
      if (response.status === "success") {
        emailRef.current.value = "";
        passwordRef.current.value = "";
        localStorage.setItem("jwt", response?.token);
        navigate("/");
        // alert("Form submitted succesfully");
      } else if (response.status === "fail") {
        alert(response.message || "Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function signupFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nameRef.current?.value) {
      return alert("Please give us your name");
    }
    if (!emailRef.current?.value) {
      return alert("Please give us your email id");
    }
    if (!passwordRef.current?.value) {
      return alert("Please give us your password");
    }
    const reqBody = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    let response;
    try {
      const request = await fetch(`http://localhost:8000/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      response = await request.json();

      if (response.status === "success") {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        localStorage.setItem("jwt", response?.token);
        navigate("/");
        // alert("Form submitted succesfully");
      } else if (response.status === "fail") {
        alert(response.message);
      }
    } catch (err) {
      console.log(response);
      alert("An error occured");
    }
  }

  return (
    <div className="w-[100%] flex flex-col justify-center items-center h-dvh">
      <form
        className="form w-[22.5%] flex flex-col gap-2 p-4 rounded"
        onSubmit={
          isLoginPage ? loginFormSubmitHandler : signupFormSubmitHandler
        }
      >
        <label className="input font-inter text-2xl text-[#3F292B] font-semibold px-1 py-[10px] outline-none rounded w-full">
          {isLoginPage ? "Log In" : "Sign Up"} to ZenTask
        </label>
        {isLoginPage || (
          <input
            type="text"
            placeholder="name"
            ref={nameRef}
            className="input font-inter px-3 py-[10px] text-[#3F292B] outline-none border rounded w-full"
          />
        )}
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
          {isLoginPage ? "Log In" : "Sign Up"}
        </button>
        <label className="input font-inter px-1 py-[10px] text-[#3F292B] outline-none rounded w-full">
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}
        </label>
        <Link to={`?mode=${isLoginPage ? "login" : "signup"}`}>
          <button
            type="button"
            className="font-inter w-fit px-5 py-[10px]  outline-none border rounded bg-[#D34F73] text-white"
            onClick={() => setIsLoginPage(!isLoginPage)}
          >
            {isLoginPage ? "Sign Up" : "Log In"}
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AuthPage;
