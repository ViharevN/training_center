import React from 'react'
import { URL } from '../../data/constants'
 
export function AdminHeader() {
    return (
        <div className='flex mx-auto font-roboto py-2 px-8 mb-14 text-white bg-black'>
            <img className='w-1' src={URL+"images/circle.svg"} alt="🞄" />
            <h1 className='text-[0.9rem] md:text-[1rem] font-light text-center'>&nbsp;Обучающий тренажер&nbsp;</h1>
            <img className='w-1' src={URL+"images/circle.svg"} alt="🞄" />
            <h1 className='ml-5 text-center text-[0.9rem] md:text-[1rem]'>Панель управления</h1>
        </div>
    )
}