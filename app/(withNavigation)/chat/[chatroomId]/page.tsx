import React from "react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
// import ChatRoom from "@/components/chat/chatRoom/ChatRoom";
import ChatRoomSection from "@/components/chat/ChatRoomSection";
import axios from "axios";

export default async function ChatRoomPage({
    params,
}: {
    params: { chatroomId: string };
}) {
    const chatroomId = params.chatroomId;
    // console.log("chat id: ", chatroomId)
    // Session
    //   const session = await getServerSession(authOptions);
    //   if (session === null) {
    //     return;
    //   }

    //   const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
    //   const senderId = session?.user.id;
    // const isStudent = true;
    // const me = await axios.get('http://localhost:3001/api/auth/me', {
    //     withCredentials: true
    // })
    // const senderId = me.data.data.id
    // if (!senderId) return;

    return (
        <>
            {/* TODO : Desktop & Mobile Student/Employer Chat room */}
            <div>
                {/* <ChatRoom isStudent={isStudent} chatroomId={chatroomId} senderId={senderId} /> */}
                <ChatRoomSection chatroomId={chatroomId} />
            </div>
        </>
    );
}
