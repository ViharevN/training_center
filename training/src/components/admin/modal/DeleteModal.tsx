import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteStepMutation, useGetStepsQuery } from '../../../store/api/api';
import { IPropsEditDeleteModal } from '../../../data/stepsModels';
import { Loader } from '../../Loader';
import EditFinishModal from './EditFinishModal.tsx';
import EditModal from './EditModal';


const DeletehModal = (props: IPropsEditDeleteModal) => {
    const [deleteStep] = useDeleteStepMutation()
    const [selectedId, setSelectedId] = useState('')

    const { data } = useGetStepsQuery(null)

    useEffect(() => {
        setSelectedId(props.step.id)
    }, [selectedId])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        const selectedData = {
            id: selectedId,
            product: props.step.product
        }

        deleteStep(selectedData).unwrap().then(() => {
            props.closeModal()
        }).catch((e) => console.log('error', e))
    }

    return (
        <Dialog open={props.openModal} onClose={props.closeModal} fullWidth maxWidth='sm'>
            <div className="flex flex-row justify-between">
                <DialogTitle sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {props.step.product}⏵ &nbsp;Удаление шага {props.step.id}
                </DialogTitle>
                <IconButton
                    color="inherit"
                    onClick={props.closeModal}
                    aria-label="close"

                    disableFocusRipple
                    sx={{ marginRight: "10px", paddingX: "20px" }}
                >
                    <CloseIcon />
                </IconButton>
            </div>
            <DialogContent>
                {props.step.id === '0' ? 
                <div className='flex flex-col items-center'>
                    <DialogContentText>
                        Данный шаг является начальным и позволяет пользователю начать прохождение тренажера. Вы не можете его удалить. Если необходимо внести изменения - отреактируйте данный шаг.
                    </DialogContentText>
                    <h1 className='text-[1.3rem] text-[#EE2A23] my-5'>Невозможно удалить шаг № {props.step.id}</h1>
                    <button type='button' className='p-2 m-2 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[200px] font-bold uppercase' onClick={props.closeModal}>
                        ок
                    </button>
                </div> :
                    <>
                        {props.step.replica.isEnd ?
                            <DialogContentText>
                                Если данный финальный шаг используется в работе тренажера, то в случае его удаления пользователь не сможет завершить прохождение тренажера.
                            </DialogContentText>
                            : <DialogContentText>
                                В случае удаления шага, используемого в древе навигации тренажера, пользователь не сможет перейти к следующему шагу, нажав на реплику, где удаляемый шаг ранее использовался.
                            </DialogContentText>}
                            
                        <div className="flex flex-row flex-wrap mb-3">
                            <h1 className='font-semibold'>На данный шаг ссылаются следующие шаги:</h1> 
                            {data ? data.filter(step => step.replica.isEnd === false && step.replica.replica1.navigate === props.step.id || step.replica.replica2?.navigate === props.step.id || step.replica.replica3?.navigate === props.step.id || step.replica.replica4?.navigate === props.step.id)
                            .map(step =>
                                <h1 key={step.id}>&nbsp;{step.id}&nbsp;</h1>
                            ) : <h1 className='text-red-600 text-xl'>Ошибка загрузки данных</h1>}
                        </div>
                           
                        <form onSubmit={(e) => handleSubmit(e)} className='p-4 flex flex-col items-center'>
                            <h1 className='text-[1.3rem] text-[#EE2A23]'>Вы действительно хотите удалить шаг № {props.step.id}?</h1>
                            <div className="flex flex-row mt-10">
                                <button type='submit' className='p-2 m-2 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[200px] font-bold uppercase'>
                                    Удалить
                                </button>
                                <button type='button' className='p-2 m-2 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[200px] font-bold uppercase' onClick={props.closeModal}>
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </>
                }
            </DialogContent>
            {/* {isUse ? <>
                {props.step.replica.isEnd ? <EditFinishModal openModal={showModal} closeModal={() => setShowModal(false)} step={deletedId} /> : <EditModal openModal={showModal} closeModal={() => setShowModal(false)} step={deletedId} />}
            </> : null} */}
        </Dialog>
    )
}

export default DeletehModal