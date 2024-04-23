"use client"

import ChatCardListStudent from "./chatCardList/ChatCardList";
// import getIsStudent from "@/actions/authentication/getIsStudent";
// import getUserId from "@/actions/authentication/getUserId";
import { useEffect, useState } from "react"
import GroupCardList from "./chatCardList/GroupCardList";
import ChatCardList from "./chatCardList/ChatCardList";
import PrimaryButton from "../buttons/primaryButton/PrimaryButton";
import CreateChatRoomModal from "./modal/CreateChatRoomModal";

type Props = {
    children: React.ReactNode,
    isStudent: boolean,
    userId: string | null
}

export default function DesktopChatPage({ children, isStudent, userId }: Props) {
    const [isGroupPage, setIsGroupPage] = useState(false)
    const [primaryLoading, setPrimaryLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleGroupPage = () => {
        setIsGroupPage(true)
    }

    const handlePrivatePage = () => {
        setIsGroupPage(false)
    }

    const handleOpenCreateChatRoomModal = async () => {
        setShowModal(true)
    }

    return (
        <div className="rounded-3xl bg-slate-50 min-h-[80vh] p-5">
            <div className="flex gap-4">
                <div className="flex flex-col lg:min-w-[430px] w-[30vw]">
                    <div className="mx-4 mb-2">
                        <div className="w-full bg-[#CBD5E1] h-[50px] rounded-md p-[6px] flex items-center mb-2">
                            <button
                                // style={{ backgroundColor: isGroupPage ? "#CBD5E" : "white" }}
                                className={`w-1/2 h-full flex items-center justify-center rounded-md ${isGroupPage ? "bg-[#CBD5E]" : "bg-white"}`}
                                onClick={handlePrivatePage}>
                                <p className="text-sm">แชทส่วนตัว</p>
                            </button>
                            <button
                                // style={{ backgroundColor: isGroupPage ? "white" : "#CBD5E" }}
                                className={`w-1/2 h-full flex items-center justify-center rounded-md ${isGroupPage ? "bg-white" : "bg-[#CBD5E]"}`}
                                onClick={handleGroupPage}>
                                <p className="text-sm">แชทกลุ่ม</p>
                            </button>
                        </div>
                    </div>
                    {isGroupPage && (
                        <div className="mx-4 mb-3">
                            <PrimaryButton
                                type="submit"
                                className="w-full"
                                isDisabled={primaryLoading}
                                isLoading={primaryLoading}
                                onClick={handleOpenCreateChatRoomModal}
                                loadingMessage="กำลังสร้าง มองข้ามไปก่อน"
                            >
                                + สร้างแชทกลุ่ม
                            </PrimaryButton>
                        </div>
                    )}
                    {/* TODO : Container */}

                    {
                        // TODO : Desktop Student Chat list
                        userId !== null && (
                            <div className={`hidden lg:block min-w-[430px] w-[30vw] ${isGroupPage ? "max-h-[62vh]" : "max-h-[71vh]"} overflow-y-auto`}>
                                {isGroupPage ? (
                                    <GroupCardList studentId={userId} />
                                ) : (
                                    <ChatCardList studentId={userId} />
                                )}
                            </div>
                        )
                    }
                    {/* TODO : Container of Chat room (chat/page.tsx & [userId]/page.tsx) */}
                </div>
                <div className="w-full">{children}</div>
            </div >
            {showModal ? (
                <CreateChatRoomModal
                    setShowModal={setShowModal}
                />
            ) : null}
        </div>

    )
}