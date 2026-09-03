import React, { useState } from "react";
import Form from "../components/Form";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { loading , setRegister } = useAuth()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 

const handleSubmit = async (e)=> {
e.preventDefault()
await setEmail({username , email , password })
navigate("/")

}

const Register = () => {
  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col  w-80 h-98  border-4 shadow-xl hover:transition-all   shadow-pink-300 !p-8">
        {/* Heading */}

        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full !text-black bg-gradient-to-r from-white to-pink-500 text-white">
            <Camera size={30} strokeWidth={2} />
          </div>
        </div>

        {/* form */}

        <form className="flex flex-col gap-1">
          <Form 
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          label="Username"
           placeholder="Enter your username" />
          <Form 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          label="Email" 
          placeholder="Enter your email" />
          <Form 
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          label="password"
           placeholder="Enter your password" />
          <button className="p-3 rounded-2xl !mt-3 !text-black active:scale-90 transition-all !py-1  bg-gradient-to-r from-white to-pink-500 text-white ">
            Login
          </button>
        </form>

        {/*remember me + forgot password */}

        <div className="flex flex-wrap items-center gap-3   text-xs sm:text-sm text-white/70">
          <a href="#" className="italic hover:text-white transition-colors">
            Don't have an account?{" "}
          </a>{" "}
          <Link className="text-black" to="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
