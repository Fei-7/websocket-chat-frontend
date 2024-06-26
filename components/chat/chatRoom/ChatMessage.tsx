"use client"

import { Message } from "@/types/chat"
import Image from "next/image"
import { useState } from "react"
import close from "@/public/icons/close.svg"
import noavatar from "@/public/icons/noavatar.svg";

type Props = {
    message: Message,
    senderId: string
}

export default function ChatMessage({ message, senderId }: Props) {
    const { id, userId, username, createdAt, content, isImage } = message
    const isSender = senderId === userId
    const newCreatedAt = new Date(createdAt)
    const hours = newCreatedAt.getHours().toString().padStart(2, "0")
    const minutes = newCreatedAt.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`

    const avatar = noavatar;

    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className={`w-full flex ${isSender ? "" : "mt-1"}`}>
            <div>
                {!isSender && (
                    <div>
                        <Image
                            className="w-[48px] h-[48px] rounded-full mr-3"
                            src={avatar}
                            alt="avatar"
                            width={48}
                            height={48}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                )}
            </div>
            <div className={`w-full flex flex-col`}>
                {!isSender && (
                    <div className="font-medium text-[14px] text-slate-700 mb-1">
                        {username}
                    </div>
                )}
                <div>
                    {isImage ? (
                        // Case: IMAGE  
                        <div className={`flex flex-col ${isSender ? "items-end" : ""}`}>
                            <div className={`flex flex-row gap-2 items-end`}>
                                <div className={`text-slate-500 text-[12px] -translate-y-[6px] lg:text-[12px] ${!isSender && "order-last"}`}>{time}</div>
                                <div>
                                    {isFullscreen && (
                                        <button
                                            onClick={toggleFullscreen}
                                            className="fixed z-50 top-0 right-0 m-6 p-1 text-white rounded-full cursor-pointer hover:bg-slate-500 md:m-[24px]"
                                        >
                                            <Image
                                                className="w-auto h-auto"
                                                src={close}
                                                alt="closeImageButton"
                                                width={32}
                                                height={32}
                                            />
                                        </button>
                                    )}
                                    <div
                                        className={`fixed z-40 inset-0 flex justify-center items-center bg-black bg-opacity-80 ${isFullscreen ? '' : 'hidden'}`}
                                    // onClick={toggleFullscreen}
                                    >
                                        <Image
                                            src={content}
                                            alt="chatImage"
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                            }}
                                            sizes="w-auto h-auto"
                                            className="w-auto h-auto"
                                        />
                                    </div>
                                    <Image
                                        src={content}
                                        alt="chatImage"
                                        width={268}
                                        height={357}
                                        className={`mb-2 rounded-[16px] max-w-[64vw] shadow lg:max-w-[24vw] cursor-pointer`}
                                        onClick={toggleFullscreen}
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Case: TEXT
                        <div className={`flex flex-col ${isSender ? "items-end" : ""}`}>
                            <div className={`flex flex-row gap-2 items-end `}>
                                <div className={`text-slate-500 text-[12px] -translate-y-[6px] lg:text-[12px] ${!isSender && "order-last"}`}>{time}</div>
                                <div className={`${isSender ? "bg-emerald-200" : "bg-slate-200"} text-slate-900 px-[10px] pt-[8px] pb-[4px] mb-2 rounded-[16px] max-w-[64vw] shadow lg:px-[12px] lg:max-w-[24vw]`}>
                                    {content}
                                </div>
                            </div>
                        </div>

                    )
                    }
                </div>
            </div>
        </div>
    )
}

// [
// {
//     id: 'd72bd0d2-df6a-4083-acf1-baa52c89b768',
//     userId: 'f587e9c0-1e66-4f08-b72b-a07b4fe0ec6f',
//     createdAt: 2024-03-24T13:14:15.582Z,
//     content: 'หวัดดี​ฮาฟฟู่ว',
//     isImage: false
//   },
//   {
//     id: '5b8d79bd-df0c-4e2d-aafd-8d7880d08e28',
//     userId: 'f587e9c0-1e66-4f08-b72b-a07b4fe0ec6f',
//     createdAt: 2024-03-24T13:30:00.199Z,
//     content: {
//       success: true,
//       data: 'https://skillbridge-s3.s3.us-east-1.amazonaws.com/imageMessageFiles/93c68ae8f5db5e7818d1157d4e7e06c574c9cd22db28e562df050c0340d887be?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVRUVUMB3ZFAZRNTX%2F20240324%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240324T200954Z&X-Amz-Expires=3600&X-Amz-Signature=bf0f57d1dd8698d817c567e2d6fde01ddd9edf72370c319de5aff01e75f74fed&X-Amz-SignedHeaders=host&x-id=GetObject'
//     },
//     isImage: true
//   }
// ]