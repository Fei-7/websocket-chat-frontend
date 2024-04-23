import React from "react";
import Image from "next/image";

export default async function Header() {


    return (
        <div>
            <div>
                <div className="flex justify-between items-center py-5 pl-5 pr-3 md:pr-5">
                    <Image
                        className="w-auto h-auto md:w-36 md:hover:scale-105 md:duration-500 active:opacity-40"
                        src={"/logos/logo-black.svg"}
                        alt="logo"
                        width={110}
                        height={110}
                        priority={true}
                    />
                </div>
            </div>
        </div>
    );
}
