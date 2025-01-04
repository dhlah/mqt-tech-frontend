"use client";

import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTheme } from 'next-themes';
const url = [
    { url: '/dashboard', text: 'Beranda' },
    { url: '/dashboard/devices', text: 'Perangkat' },
    { url: '/dashboard/users', text: 'Pengguna' }
];
import { LuMoon, LuSun } from "react-icons/lu";

export default function NavbarDashboard({ children }) {
    const { theme, setTheme } = useTheme()
    return (
        <div>
            <nav className='sticky top-0 left-0 right-0 px-2 backdrop-blur-md pb-3 z-10 flex flex-col'>
                <div className='flex justify-between w-full items-center'>
                    <h1 className='text-lg font-bold'>Dashboard</h1>
                    <div className='flex gap-6 items-center'>
                        <Menu>
                            <MenuButton className="text-black bg-slate-200 dark:text-white inline-flex items-center gap-2 rounded-md dark:bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold">
                                <FaUserCircle className='text-2xl' />
                            </MenuButton>
                            <MenuItems
                                transition
                                anchor="bottom end"
                                className="w-52 z-20 backdrop-blur-lg origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-black dark:text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                            >
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 dark:data-[focus]:bg-white/10">
                                        Edit Password
                                    </button>
                                </MenuItem>
                                <div className="my-1 h-px bg-slate-200 dark:bg-white/5" />
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 dark:data-[focus]:bg-white/10">
                                        Keluar
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                        <Menu>
                            <MenuButton className="text-black bg-slate-200 dark:text-white inline-flex items-center gap-2 rounded-md dark:bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold">
                                <LuSun className='text-2xl block dark:hidden' />
                                <LuMoon className='text-2xl hidden dark:block' />
                            </MenuButton>
                            <MenuItems
                                transition
                                anchor="bottom end"
                                className="text-black w-52 z-20 backdrop-blur-lg origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 dark:text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                            >
                                <MenuItem>
                                    <button onClick={() => setTheme("system")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 dark:data-[focus]:bg-white/10">
                                        Perangkat
                                    </button>
                                </MenuItem>
                                <div className="my-1 h-px bg-white/5" />
                                <MenuItem>
                                    <button onClick={() => setTheme("light")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 dark:data-[focus]:bg-white/10">
                                        Terang
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button onClick={() => setTheme("dark")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200 dark:data-[focus]:bg-white/10">
                                        Gelap
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <div className='flex gap-6 w-full items-center'>
                    {url.map((item, index) => (
                        <NavbarButton key={index} url={item.url} text={item.text} />
                    ))}
                </div>
            </nav>
            <div className='px-2'>
                {children}
            </div>
        </div>
    );
}

function NavbarButton({ url, text }) {
    const pathname = usePathname();
    const isActive = pathname === url;

    return (
        <div className='flex flex-col'>
            <Link href={url}>{text}</Link>
            {isActive && <span className='dark:bg-white bg-slate-900 w-full py-0.5 rounded-md'></span>}
        </div>
    );
}
