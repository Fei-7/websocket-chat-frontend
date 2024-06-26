"use client"
import ChatMessageListByDate from "./ChatMessageListByDate"
import { useRef, useEffect, useState } from "react"
import { ChatRoomInfo, MessagesGroupByDate } from "@/lib/chatInterface"
import { setIncommingMessageHandler } from "@/websocket/clientSocket"
import { constructIncommingMessageHandler } from "@/websocket/utils"
import axios from "axios"
import backEndUrl from "@/lib/backendURL";

type Props = {
    // isStudent: boolean,
    chatroomId: string,
    chatRoomInfo: ChatRoomInfo,
    senderId: string
}

let firstLoad: boolean = true;
let curChatRoomId: string = "";

export default function ChatMessageList({ chatroomId, chatRoomInfo, senderId }: Props) {
    // console.log("Rendering chat message list");
    // console.log("toDispatch = ", toDispatch);
    const [messagesByDate, setMessagesByDate] = useState<MessagesGroupByDate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    let id = chatRoomInfo?.isGroup ? chatroomId : chatRoomInfo.users[0].id === senderId ? chatRoomInfo.users[1].id : chatRoomInfo.users[0].id
    // const chatListReloadState = useAppSelector((state) => state.chatList.chatListReloadState);

    useEffect(() => {
        // if (firstLoad || curChatRoomId !== chatroomId) {
        const incommingMessageHandler = constructIncommingMessageHandler(setMessagesByDate/*, dispatch, toggleChatListReload*/);
        setIncommingMessageHandler(incommingMessageHandler);
        // console.log("SEETING");
        firstLoad = false;
        curChatRoomId = chatroomId;
        // }
    }, []);

    useEffect(() => {
        console.log(messagesByDate);
    }, [messagesByDate])

    // const incommingMessageHandler = constructIncommingMessageHandler(setMessagesByDate/*, dispatch, toggleChatListReload*/);
    // setIncommingMessageHandler(incommingMessageHandler);
    const bottomOfPanelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function getInitialData() {
            try {
                if (!id) return;
                const res = await axios.get(`${backEndUrl}/api/${chatRoomInfo?.isGroup ? "groupChat" : "privateChat"}/` + id + '/messages', {
                    withCredentials: true
                })

                console.log(res.data.data);

                setMessagesByDate(res.data.data);
                setIsLoading(false)
            } catch (err) {
                console.log(err)
                return;
            }
        }

        getInitialData();

    }, [id])

    useEffect(() => {
        const handleResize = () => {
            if (bottomOfPanelRef.current) {
                bottomOfPanelRef.current.scrollIntoView({ block: 'end' });
            }
        };

        // Add event listener for resize event
        window.addEventListener('resize', handleResize);

        // Call the handleResize function on initial render
        handleResize();

        // Cleanup: remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [messagesByDate]);

    // console.log("chat list reloading")
    // console.log("chat list page function executing");

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center text-slate-400 text-[14px] h-full w-full px-3 pb-[6px] overflow-y-auto overflow-x-hidden pt-4 lg:px-3 lg:pb-2 lg:text-[16px]">
                    {/* <div className="w-8 h-8 border-[6px] border-slate-400 rounded-full animate-spin"></div> */}
                    <svg className="animate-spin h-[48px] w-[48px] text-slate-800 lg:h-8 lg:w-8" viewBox="0 0 24 24">
                        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" stroke="slate" /><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" stroke="slate" />
                    </svg>
                </div>
            ) : (
                messagesByDate.length ? (
                    <div className="h-full w-full px-3 overflow-y-auto overflow-x-hidden pt-4 lg:px-3">
                        <div className="flex flex-col-reverse">
                            {messagesByDate.slice().reverse().map((messageByDate, index) => <ChatMessageListByDate key={index} messageByDate={messageByDate} senderId={senderId} />)}
                        </div>
                        <div ref={bottomOfPanelRef}></div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-end text-slate-400 text-[14px] h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2 lg:text-[16px]">
                        นี่คือจุดเริ่มต้นของตำนาน!
                    </div>
                )
            )

            }
        </>
    )
}