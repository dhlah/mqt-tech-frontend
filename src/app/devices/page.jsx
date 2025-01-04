"use client";

import DeviceCard from "@/components/Cards/DeviceCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DeviceListPage() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/rooms");
      const roomData = response.data.data
      setData(roomData);
      setFilteredData(roomData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    const eventSource = new EventSource("http://localhost:3001/api/events");

    // Menangani event "update" untuk mengambil data terbaru
    eventSource.onmessage = (event) => {
      if (event.data === "devices update") {
        fetchData();
      }
    };

    // Menutup koneksi SSE ketika komponen dibersihkan
    return () => {
      eventSource.close();
    };
  }, []);

  const handleSearch = (e) => {
    const queryInput = e.target.value
    const query = queryInput.toLowerCase()
    setSearchQuery(queryInput);

    if (query.length > 1) {
      const regex = new RegExp(query.split("").join("\\.?"), "i"); // Query seperti "R.A" atau "RA" akan cocok dengan data "R.A", "RA", atau "R A"

      const filtered = data.filter((room) =>
        room.devices.some((device) => regex.test(device.name.toLowerCase()))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Daftar Perangkat</h1>
      <input
        className="border-black dark:bg-slate-700 border mt-2 w-full px-3 py-2 rounded-lg"
        placeholder="Cari Perangkat..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="mt-4">
        {Array.isArray(filteredData) && filteredData.map((room) => (
          <div key={room.id} className="mb-4">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-3">
              {room.devices.map((device) => (
                <DeviceCard data={device} key={device.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
