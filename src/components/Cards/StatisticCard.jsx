import React from 'react'

export default function StatisticCard({ data }) {
    return (
        <div className='bg-slate-100 flex dark:bg-slate-700 rounded-lg shadow-md'>
            <span className='bg-slate-300 dark:bg-slate-900 rounded-l-md px-2'></span>
            <div className='p-4'>
                <div>
                    <p className='text-2xl font-bold'>{data.value}</p>
                </div>
                <div>
                    <p>{data.title}</p>
                </div>
            </div>
        </div>
    )
}
