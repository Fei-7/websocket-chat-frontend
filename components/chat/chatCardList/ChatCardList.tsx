"use client"
import ChatCard from "./ChatCard"
// import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useEffect, useState } from "react"
import { ChatListData } from "@/lib/chatInterface"
import ChatCardLoading from "./ChatCardLoading"
import SearchNotFound from "@/components/loadingAndError/SearchNotFound"
import axios from "axios"
import { connect, setOn, socket } from "@/websocket/clientSocket"
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
                const res = await axios.get(backEndURL + '/api/privateChat', {
                    withCredentials: true
                })
                const me = await axios.get(backEndURL + '/api/auth/me', {
                    withCredentials: true
                })
                const me_id = me.data.data.id
                // console.log("USing effect");
                if (!socket.connected) {
                    connect("", me_id)
                }
                setUsers(res.data.data.filter((user: { id: any }) => user.id !== me_id));
                setId(me_id)
                setOn("online users update", (onlineUsers: ChatListData[]) => {
                    // console.log("online users = ", onlineUsers);
                    setOnlineUsers(onlineUsers.filter((user: { id: any }) => user.id !== me_id));
                })
                connect("", me_id);
            } catch (err) {
                console.log("Error setEmployer: ", err)
                return;
            } finally {
                socket.emit("get online users");
                setLoading(false)
            }
        }

        // console.log(socket.id, socket.listeners('online users update'));

        getChatList();
        // console.log("New state: ", chatListReloadState

    }, []);

    useEffect(() => {
        if (!onlineUsers) return
        // const online = onlineUsers.filter((user: { id: any }) => user.id !== id)
        // // console.log("ID: ", id)
        // setOnlineUsers(online)
        // console.log("Users: ", users)
        const offline = users.filter((user: { id: any }) => !onlineUsers.map((online: { id: any }) => online.id).includes(user.id) && user.id !== id);
        setOfflineUsers(offline)
        // console.log("YES: ", offline)
    }, [onlineUsers])

    // if (firstLoad) {
    //     // console.log("first load");
    //     socket.removeAllListeners("online users update");
    //     socket.on("online users update", (onlineUsers) => {
    //         // console.log("PINGY", onlineUsers)
    //         // TODO: Separate online and offline users
    //         // const online = onlineUsers.filter((user: { id: any }) => user.id !== id)
    //         // console.log("ID: ", id)
    //         setOnlineUsers(onlineUsers)
    //         console.log(onlineUsers)
    //         // console.log("Users: ", users)
    //         // const offline = users.filter((user: { id: any }) => !onlineUsers.map((online: { id: any }) => online.id).includes(user.id));
    //         // setOfflineUsers(offline)
    //         // console.log("on: ", online, "off: ", offline)
    //     });
    //     firstLoad = false;
    // }
    // console.log("ONLINE: ", onlineUsers)
    // console.log("OFFLINE: ", offlineUsers)

    return (
        <>
            {/* {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <ChatCardLoading key={index} />
                ))
            ) : users.length ? (

                users.map((user, index) => <ChatCard key={index} user={user} id={id} />)
            ) : (
                <div className="col-span-full">
                    <SearchNotFound text="ไม่พบห้องแชท" />
                </div>
            )} */}
            <section>
                <div className="text-slate-800">ออนไลน์ ({onlineUsers.length})</div>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <ChatCardLoading key={index} />
                    ))
                ) : onlineUsers.length ? (

                    onlineUsers.map((user, index) => <ChatCard key={index} id={id} user={user} isAvailable={true} />)
                    // joinedGroups.map((group, index) => <div>joined</div>)
                ) : (
                    <div className="col-span-full">
                        <SearchNotFound text="ไม่พบห้องแชท" no_mt={true} />
                    </div>
                )}
            </section>
            <section className="mt-2">
                <div className="text-gray-400">ออฟไลน์ ({offlineUsers.length})</div>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <ChatCardLoading key={index} />
                    ))
                ) : offlineUsers.length ? (
                    offlineUsers.map((user, index) => <ChatCard key={index} id={id} user={user} isAvailable={false} />)
                    // unjoinedGroups.map((group, index) => <div>unjoined</div>)

                ) : (
                    <div className="col-span-full">
                        <SearchNotFound text="ไม่พบห้องแชท" no_mt={true} />
                    </div>
                )}
            </section>
        </>
    )
}