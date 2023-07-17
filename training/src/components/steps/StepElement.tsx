import React, { FC, useEffect } from 'react'
import { IPropsSteps } from '../../data/stepsModels'
import { useLocation, useNavigate } from 'react-router-dom'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const StepElement: FC<IPropsSteps> = ({img, alt, audio, children}) => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.getItem('personData') === null) {
            alert('Ваши персональные данные отсутствуют. \nЗаполните данные и попробуйте еще раз!')
            navigate(`/${location.pathname.split('/')[1]}/`)
        }
    }, [])

    return (
        <>
            <img className='w-[24%] md:w-[25%] h-[95%]' src={img} alt={alt} />
            <div className='flex flex-col text-center ml-7 md:ml-40 w-[600px]'>
                <div >
                    <h1 className='text-left text-[#EE2A23] text-[0.75rem] md:text-[1rem] mb-2 md:mb-4'>Клиент:</h1>
                    <div className='w-full'>
                        <AudioPlayer
                            src={audio}
                            showJumpControls={false}
                            layout={'horizontal-reverse'}
                            autoPlay={true}
                        />
                    </div>
                </div>
                <div className='mt-10 md:mt-24'>
                    <h1 className='text-[#EE2A23] text-[0.8rem] md:text-[1.5rem] mb-2 md:mb-5'>Что бы вы хотели сказать клиенту?</h1>
                    {children}
                </div>
            </div>
        </>
    )
}

export default StepElement