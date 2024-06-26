import Logo from "@/components/authentication/Logo"
import Register from "@/components/authentication/Register"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
    /*
    if (session) {
        redirect("/chat")
    }
    */

    return (
        <main className="w-full flex-col items-center bg-[#F8FAFC] h-full flex justify-center">
            {/* Logo Component */}
            <div className="flex flex-col items-center w-[381px] h-[813px] md:bg-white md:shadow-xl">
                <Logo />
                <Register />
            </div>
        </main>
    )
}
