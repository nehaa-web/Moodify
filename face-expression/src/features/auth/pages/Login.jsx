import React from "react";
import Form from "../components/Form";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (

    <main className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-2 w-80 h-98  border-4 shadow-xl hover:transition-all   shadow-pink-300 !p-8">

        {/* Heading */}

        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full !text-black bg-gradient-to-r from-white to-pink-500 text-white">
            <Camera size={30} strokeWidth={2} />
          </div>
        </div>

        {/* form */}

        <form className="flex flex-col gap-3">
          <Form label="Email" placeholder="Enter your email" />
          <Form label="password" placeholder="Enter your password" />
          <button className="p-3 !mt-5 rounded-2xl !text-black active:scale-90 transition-all !py-1  bg-gradient-to-r from-white to-pink-500 text-white ">
            Login
          </button>
        </form>

        {/*remember me + forgot password */}

          <div className="flex flex-wrap items-center gap-3  pt-2 text-xs sm:text-sm text-white/70">
            <a href="#" className="italic hover:text-white transition-colors">
              Don't have an account?{" "}
            </a>{" "}
            <Link className="text-black" to="/register">Register</Link>
          </div>

      </div>

    </main>
  );
};

export default Login;
