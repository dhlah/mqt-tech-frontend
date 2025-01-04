import { fetcher } from '@/lib/fetcher'
import React from 'react'

export default async function DeviceDashboardPage() {
  const data = await fetcher('/api/devices')
  return (
    <main>

    </main>
  )
}
