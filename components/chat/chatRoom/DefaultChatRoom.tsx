"use client"
import Image from "next/image";
import logoBlackBig from "@/public/logos/logo-black-big.svg";
import { connect } from "@/websocket/clientSocket";
import { useEffect } from "react";
import axios from "axios";
import backEndUrl from "@/lib/backendURL";

export default function DefaultChatRoom() {
    useEffect(() => {
        async function loadUserId() {
            const me = await axios.get(backEndUrl + '/api/auth/me', {
                withCredentials: true
            })
            console.log(me.data.data.id);
            const userId = me.data.data.id;
            connect("", userId);
        }

        loadUserId();
    }, [])

    return (
        <div className="h-[80vh] w-full flex flex-col gap-6 justify-center items-center bg-neutral-100 border border-[#CBD5E1]">
            <Image
                className="opacity-90"
                src={logoBlackBig}
                alt="logoBlackBig"
                width={568}
                height={240}
            />
            <div className="font-medium text-[24px] text-slate-800">
                ยินดีต้อนรับเข้าสู่ Chai4meeCHAT!
            </div>
        </div>
    )
}