import Title from "./Title"
import RegisterViaUsername from "./RegisterViaUsername"


export default function StudentRegister() {


  return (
    <div className="flex flex-col w-[280px] mt-[30px]">
      <Title title="สร้างบัญชี" highlightText="" highlightColor="" />
      <div className="text-[#64748B] leading-6 text-sm w-full">
        <RegisterViaUsername />
      </div>
    </div>
  )
}
