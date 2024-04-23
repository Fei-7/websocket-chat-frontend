"use client"

import { ChatListData, GroupListData } from "@/lib/chatInterface"
import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { connect } from "@/websocket/clientSocket"
import backEndUrl from "@/lib/backendURL";

type Props = {
    user?: ChatListData;
    id: string;
    group?: GroupListData;
    isAvailable: boolean;
    handleJoinGroup: any;
}

export default function GroupCard({ user, id, group, isAvailable, handleJoinGroup }: Props) {
    // const isChatRoom = pathName.endsWith(user.chatrooms[0].chatroomId)
    const avatar = noavatar;
    const router = useRouter();

    // const formattedDate = () => {
    //     let formattedDate = ""
    //     if (user.chatrooms[0]?.latestMessage?.createdAt.toLocaleDateString("en-GB")) {
    //         const oldDate = user.chatrooms[0]?.latestMessage?.createdAt.toLocaleDateString("en-GB")
    //         const [d, m, yy] = oldDate.split("/")
    //         formattedDate = `${parseInt(d)}/${parseInt(m)}/${yy.slice(-2)}`
    //     }

    //     return formattedDate
    // }

    return (
        <div
            className={`flex flex-row items-center h-[90px] px-[16px] py-[21px] rounded-[16px] lg:h-[94px] lg:py-[20px]`}
        >
            <Image
                className="w-[48px] h-[48px] rounded-full mr-4 lg:hidden"
                src={avatar}
                alt="avatar"
                width={48}
                height={48}
                style={{
                    objectFit: 'cover',
                }}
            />
            <Image
                className="w-[54px] h-[54px] rounded-full hidden lg:block lg:mr-4"
                src={avatar}
                alt="avatar"
                width={54}
                height={54}
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
                    <div className={`text-[16px] ${isAvailable ? "font-medium text-slate-800" : "text-gray-400"} truncate max-w-[24ch] lg:max-w-[27ch]`}>
                        {user ? user.username : group ? group.name + " (" + group.userIds.length + ")" : "กำลังดาวน์โหลด"}
                    </div>
                    {/* <div className="text-[14px] text-[#838383] lg:text-[16px]">
                        {formattedDate()}
                    </div> */}
                </div>
                {/* <div className="text-[14px] text-[#838383] w-full truncate max-w-[33ch] lg:text-[16px]">
                    {user.chatrooms[0]?.latestMessage?.isImage ? `ส่งรูป` : user.chatrooms[0]?.latestMessage?.content}
                </div> */}
            </div>
            <div
                className="hover:bg-neutral-200 hover:cursor-pointer py-2 px-3 rounded-lg text-nowrap text-slate-800"
                onClick={() => handleJoinGroup(group)}
            >เข้าร่วม</div>
        </div>

    )
}