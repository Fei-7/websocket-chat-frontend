"use client"

import { ChatListData } from "@/lib/chatInterface"
import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
    user: ChatListData
}

export default function ChatCard({ user }: Props) {
    const pathName = usePathname();
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
    const handleOnClick = async () => {
        try {
            const chatInfo = await axios.get('http://localhost:3001/api/privateChat/' + user.id, {
                withCredentials: true
            });
            console.log(chatInfo.data)
            // router.push(`/chat/${chatInfo._id}`);
        } catch (err) {
            console.log('Error getChatInfo: ', err)
        }
    }

    return (
        <div
            className={`hover:bg-neutral-100 flex flex-row items-center h-[90px] px-[16px] py-[21px] rounded-[16px] hover:cursor-pointer lg:h-[94px] lg:py-[20px]`}
            onClick={handleOnClick}
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
                    <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
                        {user.username}
                    </div>
                    {/* <div className="text-[14px] text-[#838383] lg:text-[16px]">
                        {formattedDate()}
                    </div> */}
                </div>
                {/* <div className="text-[14px] text-[#838383] w-full truncate max-w-[33ch] lg:text-[16px]">
                    {user.chatrooms[0]?.latestMessage?.isImage ? `ส่งรูป` : user.chatrooms[0]?.latestMessage?.content}
                </div> */}
            </div>
        </div>

    )
}