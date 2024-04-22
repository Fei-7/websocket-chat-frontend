"use client"

// import ReduxProvider from "@/redux/redux-provider";
import ChatRoom from "./chatRoom/ChatRoom";
import { useEffect, useState } from "react"
import axios from "axios";
import { Sender } from "@/lib/chatInterface";

type Props = {
    chatroomId: string,
    // senderId: string
}

export default function ChatRoomSection({ chatroomId }: Props) {
    const [sender, setSender] = useState<Sender>({
        id: '',
        username: '',
        chatRooms: []
    })
    // console.log("Sender: ", sender)
    useEffect(() => {
        async function getSenderId() {
            try {
                const me = await axios.get('http://localhost:3001/api/auth/me', {
                    withCredentials: true
                })
                console.log(me.data.data);
                setSender(me.data.data)
            } catch (err) {
                console.log("Error getSenderId: ", err)
                return;
            } finally {
                // setLoading(false)
            }
        }

        getSenderId();
        // console.log("New state: ", chatListReloadState)

    }, []);


    return (
        // <ReduxProvider>
        <ChatRoom chatroomId={chatroomId} sender={sender} />
        // </ReduxProvider>
    )
}