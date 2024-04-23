"use client"

import ChatCard from "./ChatCard"
// import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useEffect, useState } from "react"
import { ChatListData } from "@/lib/chatInterface"
import ChatCardLoading from "./ChatCardLoading"
import SearchNotFound from "@/components/loadingAndError/SearchNotFound"
import axios from "axios"
import { connect, socket } from "@/websocket/clientSocket"
import backEndURL from '@/lib/backendURL';

type Props = {
    studentId: string
}

let firstLoad = true;

export default function ChatCardList({ studentId }: Props) {
    const [users, setUsers] = useState<ChatListData[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [onlineUsers, setOnlineUsers] = useState<ChatListData[]>([])
    const [offlineUsers, setOfflineUsers] = useState<ChatListData[]>([])
    const [id, setId] = useState<string>('')

    useEffect(() => {
        async function getChatList() {
            try {
                const res = await axios.get(backEndURL+'/api/privateChat', {
                    withCredentials: true
                })
                const me = await axios.get(backEndURL+'/api/auth/me', {
                    withCredentials: true
                })
                const me_id = me.data.data.id
                // console.log("USing effect");
                if (!socket.connected) {
                    connect("", me_id)
                }
                setUsers(res.data.data.filter((user: { id: any }) => user.id !== me_id));
                setId(me_id)
            } catch (err) {
                console.log("Error setEmployer: ", err)
                return;
            } finally {
                setLoading(false)
            }
        }

        getChatList();
        // console.log("New state: ", chatListReloadState)

    }, []);

    if (firstLoad) {
        console.log("first load");
        socket.removeAllListeners("online users update");
        socket.on("online users update", (onlineUsers) => {
            // console.log("PING", onlineUsers)
            // TODO: Separate online and offline users
        });
        firstLoad = false;
    }

    return (
        <>
            {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <ChatCardLoading key={index} />
                ))
            ) : users.length ? (

                users.map((user, index) => <ChatCard key={index} user={user} id={id} />)
            ) : (
                <div className="col-span-full">
                    <SearchNotFound text="ไม่พบห้องแชท" />
                </div>
            )}
        </>
    )
}