import React, { FC } from 'react'
import { IPropsPage } from '../data/stepsModels'
import { TrainingHeader } from '../components/TrainingHeader'
import { Footer } from '../components/Footer'

const Page: FC<IPropsPage> = ({ children }) => {
    return (
        <div className='container mx-auto max-w-full h-full'>
            <TrainingHeader />
            <div className='flex flex-row mx-auto w-full font-roboto justify-center items-center mb-10 md:mb-36 px-10 md:px-5 h-[80vh] md:h-[85vh]'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Page