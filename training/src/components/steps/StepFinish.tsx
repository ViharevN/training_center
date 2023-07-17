import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import { IPropsSteps } from '../../data/stepsModels';

const StepFinish: FC<IPropsSteps> = ({img, alt, audio, success}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const stepFinishHandler = () => {
        navigate(`/${location.pathname.split('/')[1]}/training`, {replace: true})
    }

    return (
        <>
            <img className='w-[24%] md:w-[25%] h-[95%]' src={img} alt={alt} />
            <div className='flex flex-col text-center ml-7 md:ml-40 w-[600px]'>
                {audio ? <div>
                    <h1 className='text-left text-[#EE2A23] text-[0.75rem] md:text-[1rem] mb-2 md:mb-4'>Клиент:</h1>
                    <div className='w-full'>
                        <AudioPlayer
                            src={audio}
                            showJumpControls={false}
                            layout={'horizontal-reverse'}
                            autoPlay={true}
                        />
                    </div>
                </div>: null}
                {success ? <div className='mt-10 md:mt-24'>
                    <h1 className='text-[1.2rem] md:text-[1.8rem]'>
                        Вы отработали возражения и заполнили заявку с клиентом.
                    </h1>
                    <h1 className='font-light text-[1rem] md:text-[1.25rem] mt-3 md:mt-7'>
                        Даже если клиент отказался, ваша задача удерживать его на линии до третьего отказа! Отлично!
                    </h1>
                    <h1 className='text-[#EE2A23] text-[0.75rem] md:text-[1rem] mb-10 md:mb-24 mt-2'>
                        Хотите попробовать еще раз?
                    </h1>
                    <button
                        onClick={stepFinishHandler}
                        className='border border-[#719EFC] rounded-lg hover:cursor-pointer hover:border-[#EE2A23] w-full'>
                        <p id="pp" className='p-2 md:p-5 text-[0.75rem] md:text-[1rem]'>Попробовать ещё раз</p>
                    </button>
                </div> :
                <div className='mt-10 md:mt-24'>
                    <h1 className='font-light text-[1.2rem] md:text-[1.8rem]'>Клиент отключился! <br />Вы не эффективно отработали возражения!</h1>
                    <h1 className='text-[#EE2A23] text-[0.75rem] md:text-[1rem] mb-10 md:mb-24 mt-2'>Не огорчайтесь! Вы всегда можете попробовать ещё раз.</h1>
                    <button
                        onClick={stepFinishHandler}
                        className='border border-[#719EFC] rounded-lg hover:cursor-pointer hover:border-[#EE2A23] w-full'>
                        <p className='p-2 md:p-5 text-[0.75rem] md:text-[1rem]'>Попробовать ещё раз</p>
                    </button>
                </div>}
            </div>
        </>
    )
}

export default StepFinish