"use client"

import React, { useEffect, useState } from 'react'

export default function DashboardTable({ initialData, urlFetch, urlEventSource }) {
    const [data, setData] = useState(initialData);

    // Fungsi untuk mendapatkan data dari API Next.js
    const fetchData = async () => {
        const response = await fetch(urlFetch);
        const result = await response.json();
        setData(result.data);
    };

    useEffect(() => {
        const eventSource = new EventSource(urlEventSource);

        // Menangani event "update" untuk mengambil data terbaru
        eventSource.onmessage = (event) => {
            if (event.data === "update") {
                fetchData(); // Fetch ulang data jika ada perubahan
            }
        };

        // Menutup koneksi SSE ketika komponen dibersihkan
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>DashboardTable</div>
    )
}
