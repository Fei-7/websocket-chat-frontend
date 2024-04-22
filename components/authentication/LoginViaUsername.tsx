import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
// import { signIn } from "next-auth/react"
import PrimaryButton from "../public/buttons/primaryButton/PrimaryButton"
import { redirect } from "next/navigation"

type Error = {
  username: string
  password: string
}

type Form = {
  username: string
  password: string
}

export default function LoginViaEmail() {
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState<Error>({
    username: "",
    password: "",
  })
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const validateForm = () => {
    let success = true
    const errors: Error = {
      username: "",
      password: "",
    }
    if (form.username === "") {
      errors.username = "กรอกที่อยู่อีเมลของคุณ"
      success = false
    } 

    if (form.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ"
      success = false
    }

    return { errors, success }
  }

  const handleValidation = async (event: React.FormEvent<HTMLFormElement>) => {
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);

    event.preventDefault()
    const { errors, success } = validateForm()
    if (!success) {
      setTimeout(() => {
        setErrors(errors);
        setPrimaryLoading((prev) => !prev);
        setDisabled(false);
      }, 2000);
      return
    } 

    /**
     * fetch login here
     */
    const endPointURL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'localhost:3001') + "/api/auth/login";

    try {
      const response = await fetch(endPointURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      console.log(response);

      if (response.status === 200) {
        // redirect('/chat');
        /**
         * client redirect to /chat
         */
      } else {
        setPrimaryLoading((prev) => !prev);
        setDisabled(false);
      }
    } catch (err) {
      console.log(err);
      setPrimaryLoading((prev) => !prev);
      setDisabled(false);
    }
  }

  return (
    <form className="mt-[10px] w-full" onSubmit={handleValidation} noValidate>
      {/* Email Input Component */}
      <Input
        name="username"
        label="ชื่อผู้ใช้"
        inputType="text"
        warning={errors.username}
        handleChange={handleChange}
        value={form.username}
      />

      {/* Password Input Component */}
      <PasswordInput
        fromLoginPage={false}
        handleChange={handleChange}
        value={form.password}
        warning={errors.password}
      />

      <PrimaryButton
        type="submit"
        isDisabled={isDisabled}
        className="w-full bg-[#334155] hover:bg-slate-600 rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
        isLoading={primaryLoading}
        loadingMessage="กรุณารอสักครู่"
      >
        เข้าสู่ระบบ
      </PrimaryButton>

      <p className="w-full text-center text-sm mt-[10px]">
        ไม่เคยมีบัญชี ?{" "}
        <Link
          href={"/register"}
          className="text-[#326FE2] hover:underline hover:underline-offset-2">
          สร้างบัญชี
        </Link>
      </p>
    </form>
  )
}
