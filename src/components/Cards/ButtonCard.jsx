import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ButtonCard({ data, publishMessage, messages, statusDevice }) {
    const [isOn, setIsOn] = useState(false);

    // Filter message untuk topik spesifik
    useEffect(() => {
        const targetTopic = `${data.devicesId}/${data.id}`

        const relevantMessages = messages.filter(msg => msg.topic === targetTopic);

        if (relevantMessages.length > 0) {
            const latestMessage = relevantMessages.pop();
            setIsOn(latestMessage.message === "1");
        } else {
            setIsOn(data.data === "1")
        }
    }, [messages, data.devicesId, data.id]);

    const handleSwitchChange = () => {
        if (statusDevice) {
            const newState = !isOn;
            setIsOn(newState);

            // Kirim pesan ke topic
            publishMessage(`${data.devicesId}/${data.id}`, newState ? "1" : "0");
        } else {
            toast.warning('Perangkat Sedang OFFLINE')
        }
    };
    if (data.dataState != 'button') {
        return null
    }
    return (
        <div className="flex flex-col justify-center items-center bg-slate-700 p-4 rounded-md">
            <label className="flex flex-col gap-2 items-center cursor-pointer">
                <span className="text-white font-bold uppercase">{data.virtualName}</span>
                <input
                    type="checkbox"
                    checked={isOn}
                    onChange={handleSwitchChange}
                    className="w-20 h-20 rounded-full bg-slate-200 appearance-none checked:bg-blue-500"
                />
            </label>
        </div>
    );
}
