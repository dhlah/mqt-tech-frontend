import React from 'react'
import ToastProvider from './ToastProvider'
import SessionProviders from './SessionProviders'
import ThemeProvider from './ThemeProvider'

export default function AllProviders({ children }) {
    return (
        <>
            <SessionProviders>
                <ToastProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </ToastProvider>
            </SessionProviders>
        </>
    )
}
