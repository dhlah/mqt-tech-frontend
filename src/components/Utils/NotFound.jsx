import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-xl ">Halaman ini tidak tersedia atau data tidak ditemukan.</p>
                <Link href='/' className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Kembali ke Beranda
                </Link>
            </div>
        </>
    );
};

export default NotFound;