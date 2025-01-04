"use client";
import useMqtt from "@/hooks/useMqtt";
import React, { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { HiStatusOnline } from "react-icons/hi";
import ButtonCard from "@/components/Cards/ButtonCard";
import Link from "next/link";
import { useSession } from "next-auth/react"
import LoadingPage from "@/components/Utils/Loading";
import NotFound from "@/components/Utils/NotFound";

export default function DevicePage({ params }) {
  const { data: session } = useSession()
  const { isConnected, publishMessage, subscribeToTopic, messages, unsubscribeFromTopic } = useMqtt(session?.user?.username, session?.user?.role);
  const hasSubscribed = useRef(false); // Gunakan ref untuk melacak apakah sudah subscribe

  const deviceid = React.use(params)?.deviceid; // Unwrap the params promise
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State untuk error handling
  const [statusDevice, setStatusDevice] = useState(false)

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/devices?id=${deviceid}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceid]);

  useEffect(() => {
    if (isConnected && !hasSubscribed.current && data?.id) {
      data.virtualpin.forEach((vp) => {
        subscribeToTopic(`${vp.devicesId}/${vp.id}`);
      });
      subscribeToTopic(`${data.id}/status`);
      hasSubscribed.current = true; // Tandai sudah subscribe
    }
  }, [isConnected, data, subscribeToTopic, unsubscribeFromTopic]);


  useEffect(() => {
    if (isConnected && data?.id) {
      const targetTopic = `${data.id}/status`;
      const relevantMessages = messages.filter(msg => msg.topic === targetTopic);
      const latestMessage = relevantMessages.pop();
      setStatusDevice(latestMessage ? latestMessage.message === "online" : data?.status === "online");
    }
  }, [messages, data, subscribeToTopic, isConnected]);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <NotFound />

  return (
    <main>
      <div className="flex justify-between items-center">
        <Link href="/devices">
          <IoArrowBack size={27} />
        </Link>
        <h1 className="flex font-bold text-xl md:text-2xl lg:text-4xl">
          KONTROL {data.name}
        </h1>
        <div>
          {isConnected ? (
            <HiStatusOnline size={28} className="text-green-500" />
          ) : (
            <HiStatusOnline size={28} className="text-red-500" />
          )}
        </div>
      </div>
      <div className="ml-2">
        {statusDevice ? (
          <h2 className="mt-2 md:text-xl text-green-500 font-semibold">Online</h2>
        ) : (
          <h2 className="mt-2 md:text-xl text-red-500 font-semibold">Offline</h2>
        )}
      </div>
      <div className="mt-4 gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.virtualpin.map((vp, index) => (
          <ButtonCard data={vp} key={index} publishMessage={publishMessage} statusDevice={statusDevice} messages={messages} />
        ))}
      </div>
    </main>
  );
}
