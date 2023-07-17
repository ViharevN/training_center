import React, { useState, useRef, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, RadioGroup, Radio, Checkbox, FormControl, FormLabel, FormGroup, FormHelperText, Switch } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateStepMutation } from '../../../store/api/api';
import { IImage, IPropsEditDeleteModal } from '../../../data/stepsModels';
import { URL } from '../../../data/constants';


const EditFinishModal = (props: IPropsEditDeleteModal) => {
    useEffect(() => {
        if (selectedFile) setUpdateFile(true)
    })
    const [updateStep] = useUpdateStepMutation()

    const filePicker = useRef<HTMLInputElement>(null)
    const [updateFile, setUpdateFile] = useState(false)

    const [selectedImage, setSelectedImage] = useState('')

    let successValue = false

    const images = [{ style: 'w-[14%] md:w-[15.2%] h-[90%] mx-1', src: 'images/client_normal.svg', alt: 'Клиент в нейтральом состоянии' },
    { style: 'w-[14%] md:w-[14.7%] h-[90%] mx-1', src: 'images/client_greetings.svg', alt: 'Клиент машет рукой' },
    { style: 'w-[14%] md:w-[13.7%] h-[90%] mx-5', src: 'images/client_fsuccess.svg', alt: 'Клиент держит руки на поясе, улыбается' },
    { style: 'w-[14%] md:w-[13.5%] h-[90%] mx-4', src: 'images/client_sad.svg', alt: 'Клиент расстроен' },
    { style: 'w-[14%] md:w-[13.5%] h-[90%] mx-3', src: 'images/client_refused.svg', alt: 'Клиент рассержен' },
    { style: 'w-[14%] md:w-[13.5%] h-[90%] mx-3', src: 'images/client_shocked.svg', alt: 'Клиент удивлен' }]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        let imageData: IImage | undefined = undefined
        if (selectedImage === "1") imageData = { src: images[0]['src'], alt: images[0]['alt'] }
        else if (selectedImage === "2") imageData = { src: images[1]['src'], alt: images[1]['alt'] }
        else if (selectedImage === "3") imageData = { src: images[2]['src'], alt: images[2]['alt'] }
        else if (selectedImage === "4") imageData = { src: images[3]['src'], alt: images[3]['alt'] }
        else if (selectedImage === "5") imageData = { src: images[4]['src'], alt: images[4]['alt'] }
        else if (selectedImage === "6") imageData = { src: images[5]['src'], alt: images[5]['alt'] }

        if (checked) successValue = true
        else if (!checked) successValue = false

        let stepFormData = new FormData()
        if (updateFile) {
            stepFormData.append('audio', selectedFile!, encodeURIComponent(selectedFile!.name))
        }
        stepFormData.append('id', props.step.id)
        stepFormData.append('replica',
            JSON.stringify({
                isEnd: true,
                success: successValue
            }))
        stepFormData.append('image_name',
            JSON.stringify({
                src: URL + imageData?.src,
                alt: imageData?.alt
            }))
        stepFormData.append('product', props.step.product)

        updateStep(stepFormData).unwrap().then(() => {
            setSelectedFile(undefined)
            setUpdateFile(false)
            props.closeModal()
        }).catch((e) => console.log('error', e))
    }

    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedFile(e.target.files[0]);
    }
    const handlePick = () => {
        filePicker.current!.click()
    }

    useEffect(() => getCurrentImg(), [])
    const getCurrentImg = () => {
        let images = ['images/client_normal.svg', 'images/client_greetings.svg', 'images/client_fsuccess.svg', 'images/client_sad.svg',
            'images/client_refused.svg', 'images/client_shocked.svg']

        let currentImage = props.step.image_name.src.split(URL)[1]
        if (currentImage == images[0]) setSelectedImage("1")
        else if (currentImage == images[1]) setSelectedImage("2")
        else if (currentImage == images[2]) setSelectedImage("3")
        else if (currentImage == images[3]) setSelectedImage("4")
        else if (currentImage == images[4]) setSelectedImage("5")
        else if (currentImage == images[5]) setSelectedImage("6")

        if (props.step.replica.success === true) setChecked(true)
        else if (props.step.replica.success === false) setChecked(false)
    }

    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Dialog open={props.openModal} onClose={props.closeModal} fullWidth maxWidth='lg'>
            <div className="flex flex-row justify-between">
                <DialogTitle sx={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                {props.step.product}⏵ &nbsp; Финальная страница (шаг {props.step.id})
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
                <DialogContentText>
                    Настройте изображение клиента, его аудио ответ (если необходимо) и результат прохождения тренажера.
                </DialogContentText>
                <form onSubmit={(e) => handleSubmit(e)} className='p-4 flex flex-col items-center'>
                    <div className="flex flex-col ml-10 items-center">
                        <div className="flex flex-row my-5">
                            {images.map(e => {
                                return (
                                    <img className={e.style} src={e.src} alt={e.alt} key={e.src} />
                                )
                            })}
                        </div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            value={selectedImage}
                            name="radio-buttons-group"
                            row
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
                            onChange={(e) => setSelectedImage(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                            <FormControlLabel value="6" control={<Radio />} label="6" />
                        </RadioGroup>
                    </div>
                    <div className='flex flex-col md:flex-row mt-2 items-center w-full justify-around'>
                        <h1>Текущая аудиозапись:</h1>
                        {props.step.audio ? <div className='md:ml-5 min-w-[40%] mt-5 md:mt-0'>
                            <AudioPlayer
                                src={props.step.audio}
                                showJumpControls={false}
                                layout={'horizontal-reverse'}
                                autoPlay={false}
                            />
                        </div> : <h1>Аудиофайл не задан</h1>}
                        <div className="flex flex-col items-center">
                            <input
                                className='hidden'
                                type='file'
                                ref={filePicker}
                                onChange={handleChangeFile}
                                accept='audio/*, .ogg '
                            />
                            <button type="button" className='p-2 mt-6 mb-3 md:ml-10 border border-[#719EFC] hover:border-[#EE2A23] rounded-md' onClick={handlePick}>
                                Загрузить новое аудио
                                <DownloadIcon sx={{ color: "grey", marginLeft: "15px" }} />
                            </button>
                        </div>
                    </div>
                    {selectedFile && (
                        <h1 className='text-right mt-3'>Выбран файл: <br></br>{selectedFile.name}</h1>
                    )}
                    <div className="flex flex-col items-center mt-8">
                        <h1>Результат прохождения тренажера:</h1>
                        <div className="flex flex-row items-center">
                            {checked ? <h1 className='text-[#808080]'>Неудачно</h1> : <h1 className='text-black'>Неудачно</h1>}
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            {checked ? <h1 className='text-black'>Успешно</h1> : <h1 className='text-[#808080]'>Успешно</h1>}
                        </div>
                    </div>
                    <button type='submit' className='mt-10 p-2 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[250px] md:w-[600px] font-bold uppercase'>
                        Сохранить
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditFinishModal