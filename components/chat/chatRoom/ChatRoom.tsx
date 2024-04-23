"use client"
import ChatRoomHeader from "./ChatRoomHeader"
import ChatMessageList from "./ChatMessageList"
import ChatInput from "./ChatInput"
import { ChatRoomInfo, Sender } from "@/lib/chatInterface"
import { useEffect, useState } from "react"
import { connect } from "@/websocket/clientSocket";
import axios from "axios"
import backEndUrl from "@/lib/backendURL";

type Props = {
    chatroomId: string,
    sender: Sender
}

export default function ChatRoom({ chatroomId, sender }: Props) {
    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
        name: '',
        isGroup: false,
        userIds: [],
        users: [{
            id: '',
            username: '',
        },
        {
            id: '',
            username: '',
        }]
    });
    // console.log("Chatroom info: ", chatRoomInfo)
    useEffect(() => {
        async function getInitialData() {
            try {
                const res = await axios.get(backEndUrl + '/api/groupChat/' + chatroomId, {
                    withCredentials: true
                });
                console.log(res.data.data);
                setChatRoomInfo(res.data.data);
            } catch (err) {
                console.log(err)
                return;
            }
        }

        getInitialData();

    }, [])
    // console.log("chatromoId", chatroomId);
    // console.log("sendier id", sender.id);
    // connect to websocket with specific chatroomId and senderId
    // put it here to make sure that setIncommingMessageHandler is called after socket connection is called
    // put it here because useEffect triggers in child components before parent component
    connect(chatroomId, sender.id);
    // const isStudent = false
    return (
        <div className="h-[100dvh] w-full flex flex-col bg-neutral-100 border border-[#CBD5E1] lg:h-[80vh]">
            <ChatRoomHeader chatRoomInfo={chatRoomInfo} sender={sender} />
            <ChatMessageList chatroomId={chatroomId} chatRoomInfo={chatRoomInfo} senderId={sender.id} />
            <ChatInput chatroomId={chatroomId} />
        </div>
    )
}