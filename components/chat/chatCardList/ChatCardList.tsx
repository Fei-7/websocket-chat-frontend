"use client"

import ChatCard from "./ChatCard"
// import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useEffect, useState } from "react"
import { ChatListData } from "@/lib/chatInterface"
import ChatCardLoading from "./ChatCardLoading"
import SearchNotFound from "@/components/loadingAndError/SearchNotFound"
import axios from "axios"

type Props = {
    studentId: string
}

export default function ChatCardList({ studentId }: Props) {
    const [users, setUsers] = useState<ChatListData[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // TODO: filter ตัวเองออก
        async function getChatList() {
            try {
                const res = await axios.get('http://localhost:3001/api/privateChat', { 
                    withCredentials: true 
                })
                setUsers(res.data.data);
            } catch (err) {
                console.log("Error setEmployer: ", err)
                return;
            } finally {
                setLoading(false)
            }
        }

        getChatList();
        // console.log("New state: ", chatListReloadState)

    }, [])

    return (
        <>
            {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <ChatCardLoading key={index} />
                ))
            ) : users.length ? (
                users.map((user, index) => <ChatCard key={index} user={user} />)
            ) : (
                <div className="col-span-full">
                    <SearchNotFound text="ไม่พบห้องแชท" />
                </div>
            )}
        </>
    )
}