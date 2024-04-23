import { Dispatch, SetStateAction, useState } from "react";
import SecondaryButton from "@/components/buttons/secondaryButton/SecondaryButton";
import PrimaryButton from "@/components/buttons/primaryButton/PrimaryButton";
import toast from "react-hot-toast";
import { reqBody } from "@/types/chat";
import backEndUrl from "@/lib/backendURL";
import axios from "axios";
import Input from "@/components/input/Input";

/*
width: Fixed (380px)px;
height: Fixed (334px)px;
top: 56px;
left: -117px;
padding: 20px 0px 0px 0px;
gap: 20px;
border-radius: 15px 0px 0px 0px;
opacity: 0px;
*/

export default function CreateChatRoomModal({
    setShowModal,
}: {
    setShowModal: Dispatch<SetStateAction<boolean>>,
}) {

    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function createChatRoom() {
        setIsLoading(true);
        if (!name) {
            toast.error("สร้างไม่สำเร็จ");
            setIsLoading(false);
            return;
        }

        const chatName: reqBody = {
            name: name
        }

        try {
            const res = await axios.post(backEndUrl + '/api/groupChat', chatName, {
                withCredentials: true
            });
            // console.log("out1 jaaaaa")
            if (res.status !== 200) {
                // console.log("in jaaaaa")
                toast.error("สร้างไม่สำเร็จ เหนื่อยแล้วอะะ");
                setIsLoading(false);
                return;
            }
            console.log("out2 jaaaaa")
            toast.success("สร้างสำเร็จ เตรียมตัวเข้าสู่สมรภูมิรบ!");
            setIsLoading(false);
            setShowModal(false);

        } catch (err) {
            toast.error("สร้างไม่สำเร็จ");
            setIsLoading(false);
        }
    }

    return (
        <div
            className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px] flex flex-col justify-center items-center"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowModal(false);
                }
            }}
        >
            <div className="bg-[#f8fafc] rounded-[15px] p-[20px]">
                <p className="font-bold text-[24px] leading-[16px] h-[17px] mb-[20px] text-[#475569]">สร้างแชทกลุ่ม</p>
                {/* <p className="font-medium text-[14px] leading-[14px] h-[14px] mb-[15px] text-[#475569]">ให้คะแนนความพึงพอใจ</p>
                <p className="font-medium text-[14px] leading-[14px] h-[14px] text-[#475569] mb-[8px]">เขียนรีวิว</p> */}
                <div className="h-[104px] m-0 p-0">
                    <Input
                        type={"text"}
                        label={"ชื่อกลุ่ม"}
                        value={name}
                        name={"name"}
                        placeholder={"ชื่อกลุ่มใหม่ของคุณ"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                        isDisabled={isLoading}
                    />
                </div>
                <div className="flex flex-row gap-[20px]">
                    <SecondaryButton
                        className="w-[160px]"
                        isDisabled={isLoading}
                        isLoading={false}
                        loadingMessage="ยกเลิก"
                        onClick={() => { setShowModal(false); }}
                    >
                        ยกเลิก
                    </SecondaryButton>
                    <PrimaryButton
                        className="w-[160px]"
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        loadingMessage="กำลังสร้าง"
                        onClick={() => createChatRoom()}
                    >
                        ยืนยัน
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}