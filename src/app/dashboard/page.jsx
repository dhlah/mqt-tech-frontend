import React from 'react'
import { auth } from '@/lib/auth'
import DashboardStatisticClient from '@/components/client/DashboardStatisticClient'

export default async function DashboardPage() {
  const session = await auth()
  return (
    <div>
      <div>
        <p>Selamat Datang {session?.user?.username}</p>
      </div>
      <DashboardStatisticClient urlEventSource={'http://localhost:3001/api/events'} urlFetch={'/api/dashboard/statistic'} />
    </div>
  )
}
