"use client"

import ChatCard from "./ChatCard"
// import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useEffect, useState } from "react"
import { GroupListData } from "@/lib/chatInterface"
import ChatCardLoading from "./ChatCardLoading"
import SearchNotFound from "@/components/loadingAndError/SearchNotFound"
import axios from "axios"
import { connect, socket } from "@/websocket/clientSocket"
import backEndURL from '@/lib/backendURL';

type Props = {
    studentId: string
}

let firstLoad = true;

export default function GroupCardList({ studentId }: Props) {
    // const [groups, setGroups] = useState<GroupListData[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [joinedGroups, setJoinedGroups] = useState<GroupListData[]>([])
    const [unjoinedGroups, setUnjoinedGroups] = useState<GroupListData[]>([])
    const [id, setId] = useState<string>('')

    // Function to handle the click event when the (+) button is clicked
    const handleJoinGroup = (group: GroupListData) => {
        // Remove the group from unjoinedGroups
        const updatedUnjoinedGroups = unjoinedGroups.filter(item => item.id !== group.id);
        setUnjoinedGroups(updatedUnjoinedGroups);

        // Add the group to joinedGroups
        setJoinedGroups(prevJoinedGroups => [...prevJoinedGroups, group]);
    };

    // Waiting for all group list
    useEffect(() => {
        async function getGroupList() {
            try {
                const all = await axios.get(backEndURL + '/api/groupChat/all', {
                    withCredentials: true
                })
                const res = await axios.get(backEndURL + '/api/groupChat', {
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
                const allGroups = all.data.data
                const joined = res.data.data
                setJoinedGroups(joined)
                const unjoined = allGroups.filter((group: GroupListData) => !joined.includes(group));
                setUnjoinedGroups(unjoined)
                setId(me_id)
                console.log(me_id)
                console.log("JOIN: ", joined)
                console.log("UNJOIN: ", unjoined)
            } catch (err) {
                console.log("Error setJoinedGroups: ", err)
                return;
            } finally {
                setLoading(false)
            }
        }

        getGroupList();
        // console.log("New state: ", chatListReloadState

    }, []);

    return (
        <>
            <section>
                <div className="text-slate-800">กลุ่มของคุณ ({joinedGroups.length})</div>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <ChatCardLoading key={index} />
                    ))
                ) : joinedGroups.length ? (

                    joinedGroups.map((group, index) => <ChatCard key={index} id={id} group={group} isAvailable={true} />)
                    // joinedGroups.map((group, index) => <div>joined</div>)
                ) : (
                    <div className="col-span-full">
                        <SearchNotFound text="ไม่พบห้องแชท" no_mt={true} />
                    </div>
                )}
            </section>
            <section className="mt-2">
                <div className="text-gray-400">กลุ่มที่ยังไม่ได้เข้า ({unjoinedGroups.length})</div>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <ChatCardLoading key={index} />
                    ))
                ) : unjoinedGroups.length ? (
                    unjoinedGroups.map((group, index) => <ChatCard key={index} id={id} group={group} isAvailable={false} />)
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