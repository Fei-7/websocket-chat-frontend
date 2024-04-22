"use client"
import EmployerRegister from "./EmployerRegister"
import StudentRegister from "./StudentRegister"
import { useEffect, useState } from "react"

export default function Register() {
  

  return (
    <div className="flex flex-col items-center w-[305px] mt-[25px] ">

      <StudentRegister />
      
    </div>
  )
}
