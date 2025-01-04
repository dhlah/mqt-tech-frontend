import NavbarDashboard from '@/components/Dashboard/NavbarDashboard'
import ErrorPage from '@/components/Utils/ErrorPage';
import { auth } from '@/lib/auth'
import { isMobile } from '@/utils/isMobile';
import { headers } from "next/headers";
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardLayout({ children }) {
    // Menggunakan await pada headers()
    const userAgent = (await headers()).get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const Session = await auth()

    // Redirect jika tidak ada akses
    if (Session?.user?.role !== 'admin') {
        redirect('/')
    }

    if (mobileCheck) {
        return <ErrorPage message="Perangat Mobile Tidak Support" />
    }

    return (
        <div className='h-dvh'>
            <NavbarDashboard>
                {children}
            </NavbarDashboard>
        </div>
    )
}
