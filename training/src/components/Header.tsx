import React from 'react'
import { URL } from '../data/constants'
 
export function Header() {
    return (
        <div className="flex flex-row w-full justify-items-center font-roboto relative h-[350px] md:h-[500px]">
            <div className='absolute left-0 top-0 w-full h-full z-10 bg-gradient-to-b from-black/10 to-black/60'></div>
            <img src={URL+"images/background.png"} className='absolute left-0 top-0 w-full h-full z-0 object-cover ' alt='Операторы колл-центра'/>
          
            <div className='flex flex-col text-center mx-auto pt-5 justify-end p-4 md:p-5 z-20 text-[#e6e6e6] mb-2 md:mb-4 '>
                <h1 className='font-light text-[1.25rem] md:text-[1.60rem]'>Обучающий тренажер</h1>
                <h1 className='text-[1.875rem] md:text-[2.3rem]'>Диалог с клиентом</h1>
                <p className='font-light text-[1rem] md:text-[1.15rem] mt-2 md:mt-4'>Данный тренажер поможет вам закрепить навыки взаимодействия с клиентом.<br/>
                    Попробуйте эффективно отработать все возражения и убедить клиента заполнить заявку на получение кредитной карты!
                </p>
            </div>
       </div>
    )
}