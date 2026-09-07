import React from 'react'
import { Camera } from "lucide-react";
const Nav = () => {

  return (
   <nav className="w-full !px-5 !py-2">
  <div className="flex items-center gap-3">

    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-white to-pink-500">
      <Camera size={22} strokeWidth={2} className="text-black" />
    </div>

    <h1
      style={{ fontFamily: "Instagram Sans" }}
      className="text-2xl bg-gradient-to-r from-[#ff04b8] via-[#f082d6] to-[#fefefe] bg-clip-text text-transparent"
    >
      Moodify
    </h1>

  </div>
</nav>
  )
}

export default Nav