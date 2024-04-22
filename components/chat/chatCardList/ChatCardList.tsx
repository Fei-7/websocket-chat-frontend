"use client"

import ChatCard from "./ChatCard"
// import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useEffect, useState } from "react"
import { ChatListData } from "@/lib/chatInterface"
import ChatCardLoading from "./ChatCardLoading"
import SearchNotFound from "@/components/loadingAndError/SearchNotFound"
import axios from "axios"
import { socket } from "@/websocket/clientSocket"

type Props = {
    studentId: string
}

export default function ChatCardList({ studentId }: Props) {
    const [users, setUsers] = useState<ChatListData[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [onlineUsers, setOnlineUsers] = useState<ChatListData[]>([])
    const [offlineUsers, setOfflineUsers] = useState<ChatListData[]>([])

    useEffect(() => {
        // TODO: filter ตัวเองออก
        async function getChatList() {
            try {
                const res = await axios.get('http://localhost:3001/api/privateChat', {
                    withCredentials: true
                })
                const me = await axios.get('http://localhost:3001/api/auth/me', {
                    withCredentials: true
                })
                const me_id = me.data.data.id
                setUsers(res.data.data.filter((user: { id: any }) => user.id !== me_id));

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