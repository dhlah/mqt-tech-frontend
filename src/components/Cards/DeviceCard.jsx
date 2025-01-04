import { MdOutlineMeetingRoom } from "react-icons/md";
import React from 'react'
import Link from "next/link";

export default function DeviceCard({ data }) {
    return (
        <Link href={`/devices/${data.id}`} className="flex relative flex-col justify-center items-center rounded-lg bg-slate-200 dark:bg-slate-500 h-32">
            <span className={`p-2 rounded-full absolute top-4 right-4 ${data.status === "online" ? "bg-green-500" : "bg-red-600"}`}></span>
            <MdOutlineMeetingRoom size={48}/>
            <h3 className="font-bold">{data.name}</h3>
        </Link>
    )
}
