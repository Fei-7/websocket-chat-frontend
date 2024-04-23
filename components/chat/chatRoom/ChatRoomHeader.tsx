"use client"
import { ChatRoomInfo, Sender } from "@/lib/chatInterface"
import Image from "next/image"
import downArrowDark from "@/public/icons/downArrowDark.svg";
import Link from "next/link";
import { send } from "process";

type Props = {
    // isStudent: boolean,
    chatRoomInfo: ChatRoomInfo,
    sender: Sender
}

export default function ChatRoomHeader({ chatRoomInfo, sender }: Props) {
    console.log(chatRoomInfo);
    const title = chatRoomInfo?.isGroup ? chatRoomInfo.name : chatRoomInfo.users[0].id === sender.id ? chatRoomInfo.users[1].username : chatRoomInfo.users[0].username
    // const subtitle_1 = isStudent ? `${chatRoomInfo?.employer?.firstname || ""} ${chatRoomInfo?.employer?.middlename || ""} ${chatRoomInfo?.employer?.lastname || ""}` : ""
    // const subtitle_2 = isStudent ? `${chatRoomInfo?.employer?.position ? ", " : ""}${chatRoomInfo?.employer?.position || ""}${chatRoomInfo?.employer?.organization ? ", " : ""} ${chatRoomInfo?.employer?.organization}` : chatRoomInfo?.job?.title

    return (
        <div className="h-[90px] w-full flex flex-row items-center bg-slate-50 border-b border-[#CBD5E1] px-3 lg:h-[94px]">
            <Link
                className="mr-3 lg:hidden"
                href={"/chat"}
            >
                <Image
                    className={`rotate-90`}
                    src={downArrowDark}
                    alt="arrow"
                    width={24}
                    height={24}
                />
            </Link>
            {chatRoomInfo.users[0].username ? (
                <div className="flex flex-col justify-between gap-1">
                    <div
                        className="font-medium text-[20px] text-slate-800 truncate-[30ch] line-clamp-1 cursor-pointer hover:underline"
                    >
                        {title}
                    </div>
                </div>
            ) : (
                <div className="animate-pulse w-full flex flex-col justify-between gap-1">
                    <div className="min-h-[30px] bg-slate-200 rounded"></div>
                    {/* <div className="min-h-[21px] bg-slate-200 rounded"></div> */}
                </div>
            )}

        </div>
    )
}

// export interface ChatRoomInfo {
//     student: {
//       id: string;
//       salutation: string;
//       firstname: string;
//       middlename: string | null;
//       lastname: string;
//     };
//     employer: {
//       id: string;
//       salutation: string;
//       firstname: string;
//       middlename: string | null;
//       lastname: string;
//       position: string;
//       organization: string;
//     };
//     job: {
//       id: string;
//       title: string;
//     };
//   };