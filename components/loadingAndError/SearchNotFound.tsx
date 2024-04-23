import Image from "next/image";

const notFound = require("@/public/icons/notFound.svg") as string;

type Props = {
    text: string;
    no_mt?: boolean
};

export default function SearchNotFound({ text, no_mt = false }: Props) {
    return (
        <>
            {/* Mobile */}
            <div className="flex flex-col">
                <Image
                    src={notFound}
                    alt="notFound"
                    width={156}
                    height={156}
                    className={`${no_mt ? "my-3" : "mt-36"} mx-auto md:hidden`}
                />
                <Image
                    src={notFound}
                    alt="notFound"
                    width={206}
                    height={206}
                    className={`hidden md:block ${no_mt ? "md:my-3" : "md:mt-36 lg:mt-28"} md:mx-auto`}
                />
                <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">
                    {text}
                </div>
            </div>
        </>
    );
}
