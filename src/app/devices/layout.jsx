import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function LayoutDevice({ children }) {
    const session = await auth()
    
    if (!session?.user) redirect('/api/auth/signin')
    return (
        <div>{children}</div>
    )
}
