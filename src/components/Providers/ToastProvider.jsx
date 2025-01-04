import React from 'react'
import { Toaster } from 'sonner'

export default function ToastProvider({ children }) {
    return (
        <>
            <Toaster />
            {children}
        </>
    )
}
