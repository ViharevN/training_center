import React, { useState } from 'react'
import { ISteps } from '../../data/stepsModels';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from './modal/EditModal';
import EditFinishModal from './modal/EditFinishModal.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './modal/DeleteModal';


interface IStepItem {
    step: ISteps
}

export function Script({ step }: IStepItem) {
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return (
        <div className='flex flex-row items-center justify-between my-2 mx-1 px-3 border-2 border-[#719EFC] rounded-lg'>
            <h1 className='my-5 mx-2 w-16'> Шаг {step.id} </h1>
            <div className="flex flex-row">
                <button className='p-2' onClick={() => setShowModal(true)}>
                    <EditIcon sx={{ color: 'gray', ':hover': { color: "#719EFC" }, "width": "25px" }} />
                </button>
                <button className='p-2' onClick={() => setShowDeleteModal(true)}>
                    <DeleteIcon sx={{ color: 'gray', ':hover': { color: "#EE2A23" }, "width": "25px" }} />
                </button>
            </div>
            {step.replica.isEnd ? <EditFinishModal openModal={showModal} closeModal={() => setShowModal(false)} step={step} /> : <EditModal openModal={showModal} closeModal={() => setShowModal(false)} step={step} />}
            <DeleteModal openModal={showDeleteModal} closeModal={() => setShowDeleteModal(false)} step={step} />
        </div>
    )
}