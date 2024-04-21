"use client"

import ChatCardListStudent from "./chatCardList/ChatCardList";// import getIsStudent from "@/actions/authentication/getIsStudent";
// import getUserId from "@/actions/authentication/getUserId";
import { useEffect } from "react"

type Props = {
    isStudent: boolean,
    userId: string | null
}

export default function MobileChatPage({ isStudent, userId }: Props) {

    return (
        <div className="rounded-3xl bg-slate-50 min-h-full py-5">
            {
                // TODO : Mobile Student Chat list
                userId !== null && (
                    <div>
                        <ChatCardListStudent studentId={userId} />
                    </div >
                )}
        </div>
    )
}