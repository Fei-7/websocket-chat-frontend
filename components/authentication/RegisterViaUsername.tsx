import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
// import { signIn } from "next-auth/react"
import PrimaryButton from "../buttons/primaryButton/PrimaryButton"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation";
import { Router } from "next/router"

type Error = {
  username: string
  password: string
}

type Form = {
  username: string
  password: string
}

export default function RegisterViaUsername() {
  const router = useRouter();

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
    const endPointURL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'localhost:3001') + "/api/auth/register";

    try {
      const response = await fetch(endPointURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
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

        router.push("/chat");
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
        สร้างบัญชี
      </PrimaryButton>

    </form>
  )
}
