import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ISteps } from '../../data/stepsModels';

interface IStepItem {
    el: ISteps
}

export const Step0: FC<IStepItem> = ({ el }) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const regDate = new Date().toLocaleString().split(', ')

        const dateReg = {
            date_reg: regDate[0],
            time_reg: regDate[1]
        }
        sessionStorage.setItem('dateReg', JSON.stringify(dateReg))

        localStorage.removeItem('steps')
        localStorage.setItem('steps', '')
    })

    useEffect(() => {
        if (sessionStorage.getItem('personData') === null) {
            alert('Ваши персональные данные отсутствуют. \nЗаполните данные и попробуйте еще раз!')
            navigate(`/${location.pathname.split('/')[1]}/`)
        }
    }, [])

    const step1Handler = () => {
        navigate(`/${location.pathname.split('/')[1]}/step${el.replica.replica1.navigate}`, {replace: true})
    }

    return (
        <>
            <img className='w-[24%] md:w-[25%] h-[95%]' src={el.image_name.src} alt={el.image_name.alt} />
            <div className='flex flex-col text-center ml-20 md:ml-40 w-[450px] justify-center md:justify-end'>
                <h1 className='font-light text-[1.2rem] md:text-[1.8rem]'>Нажмите на приветственную реплику, чтобы начать диалог</h1>
                <div className='mt-24'>
                    <button key={el.id}
                        onClick={step1Handler}
                        className='border border-[#719EFC] rounded-lg hover:cursor-pointer hover:border-[#EE2A23] w-full mt-2 md:mt-5'>
                        <p className='p-2 md:p-5 text-[0.75rem] md:text-[1rem]'>{el.replica.replica1.replica}</p>
                    </button>
                </div>
            </div>
        </>
    )
}