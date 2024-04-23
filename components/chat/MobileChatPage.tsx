"use client"

import ChatCardList from "./chatCardList/ChatCardList";// import getIsStudent from "@/actions/authentication/getIsStudent";
// import getUserId from "@/actions/authentication/getUserId";
import { useEffect, useState } from "react"
import GroupCardList from "./chatCardList/GroupCardList";

type Props = {
    isStudent: boolean,
    userId: string | null
}

export default function MobileChatPage({ isStudent, userId }: Props) {
    const [isGroupPage, setIsGroupPage] = useState(false)

    const handleGroupPage = () => {
        setIsGroupPage(true)
    }

    const handlePrivatePage = () => {
        setIsGroupPage(false)
    }

    return (
        <>
            <div className="rounded-3xl bg-slate-50 min-h-full py-5">
                <div className="flex flex-col w-full mt-5">
                    <div className="mx-4">
                        <div className="w-full bg-[#CBD5E1] h-[50px] rounded-md p-[6px] flex items-center mb-2">
                            <button
                                // style={{ backgroundColor: isGroupPage ? "#CBD5E" : "white" }}
                                className={`w-1/2 h-full flex items-center justify-center rounded-md ${isGroupPage ? "bg-[#CBD5E]" : "bg-white"}`}
                                onClick={handlePrivatePage}>
                                <p className="text-sm">แชทส่วนตัว</p>
                            </button>
                            <button
                                // style={{ backgroundColor: isGroupPage ? "white" : "#CBD5E" }}
                                className={`w-1/2 h-full flex items-center justify-center rounded-md ${isGroupPage ? "bg-white" : "bg-[#CBD5E]"}`}
                                onClick={handleGroupPage}>
                                <p className="text-sm">แชทกลุ่ม</p>
                            </button>
                        </div>
                    </div>
                    {
                        // Mobile Chat list
                        userId !== null && (
                            <div className="ml-4">
                                {isGroupPage ? (
                                    <GroupCardList studentId={userId} />
                                ) : (
                                    <ChatCardList studentId={userId} />
                                )}
                            </div >
                        )}
                </div>
            </div>
        </>
    )
}