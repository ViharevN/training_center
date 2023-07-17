import React from 'react'
import { URL } from '../data/constants'
 
export function Footer() {
    return (
       <div className='bg-black text-center p-2 w-full'>
            <img src={URL+'images/ContactCenter.svg'} className='mx-auto w-[2.5%] my-1' alt='Логотип'/>
            <h1 className='text-white opacity-40 font-sans text-[0.7rem]'>Contact Center№1 -  2023</h1>
       </div>
    )
}