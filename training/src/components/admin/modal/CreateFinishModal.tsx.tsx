import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { AppBar, FormControlLabel, IconButton, Radio, RadioGroup, Switch, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateStepMutation } from '../../../store/api/api';
import { IImage, IPropsCreateModal } from '../../../data/stepsModels';
import { URL } from '../../../data/constants';



type StepSubmitForm = {
    stepNumber: string;
};

const CreateFinishModal = (props: IPropsCreateModal) => {
    const regex = /^\d+((?:[.]\d+)?){1,}$/

    let successValue = false

    const images = [{ style: 'w-[14%] md:w-[17%] h-[90%] mx-1', src: 'images/client_normal.svg', alt: 'Клиент в нейтральом состоянии' },
    { style: 'w-[14%] md:w-[16.5%] h-[90%] mx-1', src: 'images/client_greetings.svg', alt: 'Клиент машет рукой' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_fsuccess.svg', alt: 'Клиент держит руки на поясе, улыбается' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_sad.svg', alt: 'Клиент расстроен' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_refused.svg', alt: 'Клиент рассержен' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_shocked.svg', alt: 'Клиент удивлен' }]

    const validationSchema = Yup.object().shape({
        stepNumber: Yup.string()
            .required('Введите номер шага!')
            .matches(regex, 'Неверный формат номера шага!')
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<StepSubmitForm>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async () => {
        if (imageNumber === "") {
            setErrorImage('Выберите изображение!')
            return
        } else setErrorImage('')

        if (!selectedFile) {
            setErrorFile('Пожалуйста, загрузите файл!')
            return
        } else setErrorFile('')


        let imageData: IImage | undefined = undefined
        if (imageNumber === "1") imageData = { src: images[0]['src'], alt: images[0]['alt'] }
        else if (imageNumber === "2") imageData = { src: images[1]['src'], alt: images[1]['alt'] }
        else if (imageNumber === "3") imageData = { src: images[2]['src'], alt: images[2]['alt'] }
        else if (imageNumber === "4") imageData = { src: images[3]['src'], alt: images[3]['alt'] }
        else if (imageNumber === "5") imageData = { src: images[4]['src'], alt: images[4]['alt'] }
        else if (imageNumber === "6") imageData = { src: images[5]['src'], alt: images[5]['alt'] }

        if (checked) successValue = true
        else if (!checked) successValue = false

        let stepFormData = new FormData()
        stepFormData.append('audio', selectedFile, encodeURIComponent(selectedFile.name))
        stepFormData.append('id', stepNumber)
        stepFormData.append('replica',
            JSON.stringify({
                isEnd: true,
                success: successValue
            }))
        stepFormData.append('image_name',
            JSON.stringify({
                src: URL + imageData?.src,
                alt: imageData?.alt
            })
        )
        stepFormData.append('product', props.product)

        createStep(stepFormData).unwrap().then(() => {
            setStepNumber('')
            setImageNumber('')
            setSelectedFile(undefined)
            setErrorImage('')
            setErrorFile('')
            setErrorPOST('')
            setChecked(false)
            props.closeModal()
        }).catch(() => {
            console.log(error)
            if (error === undefined)
                setErrorPOST('Ошибка создания реплики! Возможно, Вы не заполнили все поля.')
            else
                setErrorPOST('Шаг с таким номером уже существует!')
        }
        )
    };

    const [stepNumber, setStepNumber] = useState('')
    const [createStep, { error }] = useCreateStepMutation()
    const [errorPOST, setErrorPOST] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [imageNumber, setImageNumber] = useState('')

    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const filePicker = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
    const [errorFile, setErrorFile] = useState('')

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setSelectedFile(event.target.files[0]);
    }

    const handlePick = () => {
        filePicker.current!.click()
    }

    return (
        <Dialog fullScreen open={props.openModal} onClose={props.closeModal}>
            <AppBar sx={{ position: 'relative', background: 'black' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {props.product} &nbsp; ⏵ &nbsp; Создание финальной страницы
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.closeModal}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <DialogContentText>
                    Создайте финальную страницу, появляющуюся перед обучающимся в конце прохождения тренажера.
                    Данная страница содержит сообщение об успешном/неудачном прохождении.
                    <br />Вы можете настроить изображение клиента, его аудио ответ (не обязательно) и результат прохождения тренажера.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center mt-5'>
                    <div className="flex flex-col items-center">
                        <h1 className='text-[1.10rem] md:text-[1.25rem]'>Введите номер шага в формате 1/1.2/1.2.2 и т.д.:</h1>
                        <TextField
                            id="stepNumber"
                            label='Номер шага'
                            variant="standard"
                            sx={{ width: '200px', marginLeft: "20px", paddingBottom: "20px" }}
                            {...register('stepNumber')}
                            value={stepNumber}
                            onChange={event => setStepNumber(event.target.value)}
                        />
                        <div className="text-[#EE2A23]">{errors.stepNumber?.message}</div>
                    </div>
                    <h1 className='text-[1.10rem] md:text-[1.25rem]'>Выберите изображение клиента</h1>
                    <div className='flex flex-row sm:flex-col w-[1000px] items-center'>
                        <div className="flex flex-col sm:flex-row w-[600px] lg:w-[900px] justify-around items-center md:items-end my-5">
                            {images.map(e => {
                                return (
                                    <img className={e.style} src={e.src} alt={e.alt} key={e.src} />
                                )
                            })}
                        </div>
                        <RadioGroup
                            id='imageName'
                            aria-labelledby="imageName"
                            row
                            value={imageNumber}
                            onChange={(e) => setImageNumber(e.target.value)}
                            sx={{
                                display: 'flex', flexDirection: {
                                    sm: "row",
                                    xs: "column"
                                },
                                justifyContent: {
                                    md: 'space-between',
                                    sm: 'space-evenly',
                                    xs: 'space-around'
                                },
                                marginBottom: '1.5rem', width: {
                                    lg: '900px',
                                    md: '700px',
                                    sm: '400px',
                                    xs: '400px'
                                }
                            }}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                            <FormControlLabel value="6" control={<Radio />} label="6" />
                        </RadioGroup>
                        <h1 className='text-[#EE2A23] text-center mb-2'>{errorImage}</h1>
                    </div>
                    <h1 className='text-[1.10rem] md:text-[1.25rem]'>Загрузите аудио-реплику клиента</h1>
                    <div className='flex flex-col mt-1'>
                        <input
                            className='hidden'
                            type='file'
                            ref={filePicker}
                            onChange={handleChangeFile}
                            accept='audio/*'
                        />
                        <button type="button" className='p-2 mt-3 mb-3 border border-[#719EFC] hover:border-[#EE2A23] rounded-md' onClick={handlePick}>
                            Загрузить аудио
                            <DownloadIcon sx={{ color: "grey", marginLeft: "15px" }} />
                        </button>
                        {selectedFile && (
                            <h1 className='text-center'>Выбран файл: {selectedFile.name}</h1>
                        )}
                        <h1 className='text-[#EE2A23] text-center mb-2'>{errorFile}</h1>
                    </div>
                    <h1 className='text-[1.10rem] md:text-[1.25rem] mt-3'>Выберите результат прохождения тренажера</h1>
                    <div className="flex flex-row items-center">
                        {checked ? <h1 className='text-[#808080]'>Неудачно</h1> : <h1 className='text-black'>Неудачно</h1>}
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        {checked ? <h1 className='text-black'>Успешно</h1> : <h1 className='text-[#808080]'>Успешно</h1>}
                    </div>
                    <h1 className='text-[#EE2A23] text-center mb-3'>{errorPOST}</h1>
                    <button type='submit' className='mt-14 p-3 mb-3 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[250px] md:w-[600px] font-bold uppercase'>
                        Сохранить
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFinishModal