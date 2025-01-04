"use client"

import React, { useEffect, useState } from 'react'
import StatisticCard from '../Cards/StatisticCard';

export default function DashboardStatisticClient({ urlFetch, urlEventSource }) {
    const [data, setData] = useState([]);

    // Fungsi untuk mendapatkan data dari API Next.js
    const fetchData = async () => {
        const response = await fetch(urlFetch);
        const result = await response.json();
        setData(result.data);
    };

    useEffect(() => {
        fetchData(); // Fetch data pertama kali saat komponen dimuat
        const eventSource = new EventSource(urlEventSource);

        // Menangani event "update" untuk mengambil data terbaru
        eventSource.onmessage = (event) => {
            if (event.data === "devices update") {
                fetchData(); // Fetch ulang data jika ada perubahan
            }
        };

        // Menutup koneksi SSE ketika komponen dibersihkan
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className='grid mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 '>
            {data?.map((data, index) => (
                <StatisticCard data={data} key={index} />
            ))}
        </div>
    )
}
