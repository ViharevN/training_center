import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { AppBar, Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, Radio, RadioGroup, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateStepMutation, useGetStepsQuery } from '../../../store/api/api';
import { IImage, IPropsCreateModal } from '../../../data/stepsModels';
import { URL } from '../../../data/constants';


type StepSubmitForm = {
    stepNumber: string;
    replica1: string;
};

const CreateModal = (props: IPropsCreateModal) => {
    const { isLoading, data } = useGetStepsQuery(null)

    const regex = /^\d+((?:[.]\d+)?){1,}$/

    const images = [{ style: 'w-[14%] md:w-[17%] h-[90%] mx-1', src: 'images/client_normal.svg', alt: 'Клиент в нейтральом состоянии' },
    { style: 'w-[14%] md:w-[16.5%] h-[90%] mx-1', src: 'images/client_greetings.svg', alt: 'Клиент машет рукой' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_fsuccess.svg', alt: 'Клиент держит руки на поясе, улыбается' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_sad.svg', alt: 'Клиент расстроен' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_refused.svg', alt: 'Клиент рассержен' },
    { style: 'w-[14%] md:w-[15.5%] h-[90%] mx-5', src: 'images/client_shocked.svg', alt: 'Клиент удивлен' }]

    const validationSchema = Yup.object().shape({
        stepNumber: Yup.string()
            .required('Введите номер шага!')
            .matches(regex, 'Неверный формат номера шага!'),
        replica1: Yup.string()
            .required('Введите хотя бы одну реплику!'),
    })
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<StepSubmitForm>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const [numberError, setNumberError] = useState(false)
    const onSubmit = async () => {
        setErrorPOST('')
        if (stepNumber.length === 0) {
            setNumberError(true)
            return
        } else setNumberError(false)

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

        if (replica1 === '') {
            setErrorReplica('Добавьте хотя бы 1 реплику!')
            return
        }
        else if (stepNumber !== '0' && replica1 !== '' && nav1.id === '') {
            setErrorReplica('Выберите шаг, на который ведет 1 реплика!')
            return
        } else setErrorReplica('')

        if (replica2 !== '' && nav2.id === '') {
            setErrorReplica('Выберите шаг, на который ведет 2 реплика!')
            return
        } else setErrorReplica('')
        if (replica3 !== '' && nav3.id === '') {
            setErrorReplica('Выберите шаг, на который ведет 3 реплика!')
            return
        } else setErrorReplica('')
        if (replica4 !== '' && nav4.id === '') {
            setErrorReplica('Выберите шаг, на который ведет 4 реплика!')
            return
        } else setErrorReplica('')


        if (error1) return
        if (error2) return
        if (error3) return
        if (error4) return

        let stepFormData = new FormData()
        stepFormData.append('audio', selectedFile, encodeURIComponent(selectedFile.name))
        stepFormData.append('id', stepNumber)
        stepFormData.append('replica',
            JSON.stringify({
                replica1: {
                    replica: replica1,
                    navigate: nav1.id,
                    final: finalState,
                    result: resultState
                },
                replica2: {
                    replica: replica2,
                    navigate: nav2.id,
                    final: finalState2,
                    result: resultState2
                },
                replica3: {
                    replica: replica3,
                    navigate: nav3.id,
                    final: finalState3,
                    result: resultState3
                },
                replica4: {
                    replica: replica4,
                    navigate: nav4.id,
                    final: finalState4,
                    result: resultState4
                },
                isEnd: false,
                success: false
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
            setNumberError(false)
            setImageNumber('')
            setSelectedFile(undefined)
            setReplica1('')
            setReplica2('')
            setReplica3('')
            setReplica4('')
            setCounter(1)
            setField2(false)
            setField3(false)
            setField4(false)
            setNav1({id:'', final: false})
            setNav2({id:'', final: false})
            setNav3({id:'', final: false})
            setNav4({id:'', final: false})
            setState1({ ...state1, unsuccess1: false, success1: false })
            setState2({ ...state2, unsuccess2: false, success2: false })
            setState3({ ...state3, unsuccess3: false, success3: false })
            setState4({ ...state4, unsuccess4: false, success4: false })

            setErrorImage('')
            setErrorFile('')
            setErrorReplica('')
            setErrorPOST('')
            props.closeModal()
        }).catch(() => {
            setErrorPOST('Ошибка создания реплики! Возможно, шаг с таким номером уже существует!')
        }
        )
    };

    const [createStep, { error }] = useCreateStepMutation()
    const [errorPOST, setErrorPOST] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [imageNumber, setImageNumber] = useState('')
    const [stepNumber, setStepNumber] = useState('')

    const [errorReplica, setErrorReplica] = useState('')
    const [replica1, setReplica1] = useState('')
    const [replica2, setReplica2] = useState('')
    const [replica3, setReplica3] = useState('')
    const [replica4, setReplica4] = useState('')
    const [counter, setCounter] = useState(1)
    const [field2, setField2] = useState(false)
    const [field3, setField3] = useState(false)
    const [field4, setField4] = useState(false)

    const [finalState, setFinalState] = useState(false)
    const [resultState, setResultState] = useState('')
    const [finalState2, setFinalState2] = useState(false)
    const [resultState2, setResultState2] = useState('')
    const [finalState3, setFinalState3] = useState(false)
    const [resultState3, setResultState3] = useState('')
    const [finalState4, setFinalState4] = useState(false)
    const [resultState4, setResultState4] = useState('')

    const [nav1, setNav1] = useState({ id: '', final: false })
    const [nav2, setNav2] = useState({ id: '', final: false })
    const [nav3, setNav3] = useState({ id: '', final: false })
    const [nav4, setNav4] = useState({ id: '', final: false })

    const [state1, setState1] = useState({
        unsuccess1: false,
        success1: false
    });
    const handleChangeEnd1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState1({ ...state1, [event.target.name]: event.target.checked });
    };
    const { unsuccess1, success1 } = state1;
    const error1 = [unsuccess1, success1].filter((v) => v).length > 1;

    const [state2, setState2] = useState({
        unsuccess2: false,
        success2: false
    });
    const handleChangeEnd2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState2({ ...state2, [event.target.name]: event.target.checked });
    };
    const { unsuccess2, success2 } = state2;
    const error2 = [unsuccess2, success2].filter((v) => v).length > 1;

    const [state3, setState3] = useState({
        unsuccess3: false,
        success3: false
    });
    const handleChangeEnd3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState3({ ...state3, [event.target.name]: event.target.checked });
    };
    const { unsuccess3, success3 } = state3;
    const error3 = [unsuccess3, success3].filter((v) => v).length > 1;

    const [state4, setState4] = useState({
        unsuccess4: false,
        success4: false
    });
    const handleChangeEnd4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState4({ ...state4, [event.target.name]: event.target.checked });
    };
    const { unsuccess4, success4 } = state4;
    const error4 = [unsuccess4, success4].filter((v) => v).length > 1;

    useEffect(() => {
        if (state1.success1 === false && state1.unsuccess1 === false) {
            setFinalState(false)
            setResultState('')
        } else if (state1.success1 === true) {
            setFinalState(true)
            setResultState('Успех')
        } else if (state1.unsuccess1 === true) {
            setFinalState(true)
            setResultState('Неудача')
        }
    }, [state1])

    useEffect(() => {
        if (state2.success2 === false && state2.unsuccess2 === false) {
            setFinalState2(false)
            setResultState2('')
        } else if (state2.success2 === true) {
            setFinalState2(true)
            setResultState2('Успех')
        } else if (state2.unsuccess2 === true) {
            setFinalState2(true)
            setResultState2('Неудача')
        }
    }, [state2])

    useEffect(() => {
        if (state3.success3 === false && state3.unsuccess3 === false) {
            setFinalState3(false)
            setResultState3('')
        } else if (state3.success3 === true) {
            setFinalState3(true)
            setResultState3('Успех')
        } else if (state3.unsuccess3 === true) {
            setFinalState3(true)
            setResultState3('Неудача')
        }
    }, [state3])

    useEffect(() => {
        if (state4.success4 === false && state4.unsuccess4 === false) {
            setFinalState4(false)
            setResultState4('')
        } else if (state4.success4 === true) {
            setFinalState4(true)
            setResultState4('Успех')
        } else if (state4.unsuccess4 === true) {
            setFinalState4(true)
            setResultState4('Неудача')
        }
    }, [state4])

    const handleCreateReplica = () => {
        if (counter === 1) {
            setCounter(counter + 1)
            if (!field2) setField2(true)
        } else if (counter === 2) {
            setCounter(counter + 1)
            if (!field3) setField3(true)
        } else if (counter === 3) {
            setCounter(counter + 1)
            if (!field4) setField4(true)
        } else if (counter === 4) return setErrorReplica('Максимальное количество реплик - 4')
    }

    const handleCloseReplica = () => {
        setErrorReplica('')
        if (counter === 4) {
            setCounter(counter - 1)
            if (field4) {
                setField4(false)
                setReplica4('')
                setNav4({id:'', final: false})
                setState4({ ...state4, unsuccess4: false, success4: false })
            }
        } else if (counter === 3) {
            setCounter(counter - 1)
            if (field3) {
                setField3(false)
                setReplica3('')
                setNav3({id:'', final: false})
                setState3({ ...state3, unsuccess3: false, success3: false })
            }
        } else if (counter === 2) {
            setCounter(counter - 1)
            if (field2) {
                setField2(false)
                setReplica2('')
                setNav2({id:'', final: false})
                setState2({ ...state2, unsuccess2: false, success2: false })
            }
        }
    }

    const filePicker = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
    const [errorFile, setErrorFile] = useState('')

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setSelectedFile(event.target.files[0]);
    }

    const handlePick = () => {
        filePicker.current!.click()
    }

    const stepData = [{ "id": "0", "final": false }]
    stepData.pop()
    data!.filter(step => step.product === props.product).map((data) => stepData.push({ "id": data.id, "final": data.replica.isEnd! }))

    const options = stepData.map((option) => {
        return {
            finalRep: (option.final !== true) ? 'Обычный' : 'Финал',
            ...option,
        };
    });

    return (
        <Dialog fullScreen open={props.openModal} onClose={props.closeModal}>
            <AppBar sx={{ position: 'relative', background: 'black' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {props.product} &nbsp; ⏵ &nbsp;  Создание шага диалога
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
                    Создайте новый шаг диалога. Для этого необходимо указать номер шага, выбрать изображение клиента, загрузить аудиозапись и написать реплику.
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
                    <h1 className='text-[1.10rem] md:text-[1.25rem] mt-3'>Введите варианты возможных ответных реплик и номера шагов, на которые они ведут</h1>
                    <button type="button" className='p-2 mt-3 mb-3 border border-[#719EFC] hover:border-[#EE2A23] rounded-md' onClick={handleCreateReplica}>
                        Новая реплика
                        <AddIcon sx={{ color: "grey", marginLeft: "15px" }} />
                    </button>
                    <div className="flex flex-col justify-center items-center">
                        <div className='flex flex-wrap items-end justify-center max-w-[1280px]'>
                            <TextField
                                id="standard-multiline-static"
                                label='Реплика 1'
                                multiline
                                rows={2}
                                variant="standard"
                                {...register('replica1')}
                                value={replica1}
                                onChange={(newReplica) => setReplica1(newReplica.target.value)}
                                sx={{
                                    width: {
                                        md: "900px",
                                        sm: '400px',
                                        xs: "300px"
                                    }
                                }}
                            />
                            {replica1 ?
                                <>
                                    <Autocomplete
                                        disablePortal
                                        disableClearable
                                        id="combo-box-step"
                                        value={nav1}
                                        onChange={(event: any, newValue: { id: string, final: boolean }) => {
                                            setNav1(newValue);
                                        }}
                                        options={options.sort((a, b) => a.finalRep.toString().localeCompare(b.finalRep))}
                                        groupBy={(option) => (option.final !== true) ? 'Простой' : 'Финал'}
                                        getOptionLabel={(option) => option.id}
                                        sx={{ marginLeft: "20px", width: '100px' }}
                                        renderInput={(params) => <TextField {...params} label="След. шаг" variant="standard" />}
                                    />
                                    <FormControl error={error1} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        <FormLabel component="legend" sx={{ color: "#808080", fontSize: "14px", "&.Mui-focused": { color: "#737373" } }}>
                                            Данная реплика ведет к результату:
                                        </FormLabel>
                                        <FormGroup sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                            <FormControlLabel
                                                control={<Checkbox checked={unsuccess1} onChange={handleChangeEnd1} name="unsuccess1" />}
                                                label="Неудача"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={success1} onChange={handleChangeEnd1} name="success1" />}
                                                label="Успех"
                                            />
                                        </FormGroup>
                                        <FormHelperText>Выберите 1 вариант (указывается, если после выбора данной реплики следует финальная страница)</FormHelperText>
                                    </FormControl>
                                </> : null}
                        </div>
                        <div className="text-[#EE2A23] self-center">{errors.replica1?.message}</div>
                        {field2 ? <div className='flex flex-wrap items-end justify-center max-w-[1280px]'>
                            <TextField
                                id="standard-multiline-static"
                                label='Реплика 2'
                                multiline
                                rows={2}
                                variant="standard"
                                value={replica2}
                                onChange={(newReplica) => setReplica2(newReplica.target.value)}
                                sx={{
                                    width: {
                                        md: "900px",
                                        sm: '400px',
                                        xs: "300px"
                                    }, marginTop: "20px", marginLeft: {
                                        md: "60px"
                                    }
                                }}
                            />
                            {replica2 ?
                                <>
                                    <Autocomplete
                                        disablePortal
                                        disableClearable
                                        id="combo-box-step-2"
                                        value={nav2}
                                        onChange={(event: any, newValue: { id: string, final: boolean }) => {
                                            setNav2(newValue);
                                        }}
                                        options={options.sort((a, b) => a.finalRep.toString().localeCompare(b.finalRep))}
                                        groupBy={(option) => (option.final !== true) ? 'Простой' : 'Финал'}
                                        getOptionLabel={(option) => option.id}
                                        sx={{ marginLeft: "20px", width: '100px' }}
                                        renderInput={(params) => <TextField {...params} label="След. шаг" variant="standard" />}
                                    />
                                </> : null}
                            <button type="button" className='ml-2 md:ml-10 text-[#EE2A23]' onClick={handleCloseReplica}>
                                <CloseIcon />
                            </button>
                            {replica2 ?
                                <>
                                    <FormControl error={error2} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        <FormLabel component="legend" sx={{ color: "#808080", fontSize: "14px", "&.Mui-focused": { color: "#737373" } }}>
                                            Данная реплика ведет к результату:
                                        </FormLabel>
                                        <FormGroup sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                            <FormControlLabel
                                                control={<Checkbox checked={unsuccess2} onChange={handleChangeEnd2} name="unsuccess2" />}
                                                label="Неудача"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={success2} onChange={handleChangeEnd2} name="success2" />}
                                                label="Успех"
                                            />
                                        </FormGroup>
                                        <FormHelperText>Выберите 1 вариант (указывается, если после выбора данной реплики следует финальная страница)</FormHelperText>
                                    </FormControl>
                                </> : null}
                        </div> : null}
                        {field3 ? <div className='flex flex-wrap items-end justify-center max-w-[1280px]'>
                            <TextField
                                id="standard-multiline-static"
                                label='Реплика 3'
                                multiline
                                rows={2}
                                variant="standard"
                                value={replica3}
                                onChange={(newReplica) => setReplica3(newReplica.target.value)}
                                sx={{
                                    width: {
                                        md: "900px",
                                        sm: '400px',
                                        xs: "300px"
                                    }, marginTop: "20px", marginLeft: {
                                        md: "60px"
                                    }
                                }}
                            />
                            {replica3 ?
                                <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="combo-box-step-3"
                                    value={nav3}
                                    onChange={(event: any, newValue: { id: string, final: boolean }) => {
                                        setNav3(newValue);
                                    }}
                                    options={options.sort((a, b) => a.finalRep.toString().localeCompare(b.finalRep))}
                                    groupBy={(option) => (option.final !== true) ? 'Простой' : 'Финал'}
                                    getOptionLabel={(option) => option.id}
                                    sx={{ marginLeft: "20px", width: '100px' }}
                                    renderInput={(params) => <TextField {...params} label="След. шаг" variant="standard" />}
                                /> : null}
                            <button type="button" className='ml-2 md:ml-10 text-[#EE2A23]' onClick={handleCloseReplica}>
                                <CloseIcon />
                            </button>
                            {replica3 ?
                                <FormControl error={error3} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <FormLabel component="legend" sx={{ color: "#808080", fontSize: "14px", "&.Mui-focused": { color: "#737373" } }}>
                                        Данная реплика ведет к результату:
                                    </FormLabel>
                                    <FormGroup sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={unsuccess3} onChange={handleChangeEnd3} name="unsuccess3" />}
                                            label="Неудача"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={success3} onChange={handleChangeEnd3} name="success3" />}
                                            label="Успех"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Выберите 1 вариант (указывается, если после выбора данной реплики следует финальная страница)</FormHelperText>
                                </FormControl>
                                : null}
                        </div> : null}
                        {field4 ? <div className='flex flex-wrap items-end justify-center max-w-[1280px]'>
                            <TextField
                                id="standard-multiline-static"
                                label='Реплика 4'
                                multiline
                                rows={2}
                                variant="standard"
                                value={replica4}
                                onChange={(newReplica) => setReplica4(newReplica.target.value)}
                                sx={{
                                    width: {
                                        md: "900px",
                                        sm: '400px',
                                        xs: "300px"
                                    }, marginTop: "20px", marginLeft: {
                                        md: "60px"
                                    }
                                }}
                            />
                            {replica4 ?
                                <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="combo-box-step-4"
                                    value={nav4}
                                    onChange={(event: any, newValue: { id: string, final: boolean }) => {
                                        setNav4(newValue);
                                    }}
                                    options={options.sort((a, b) => a.finalRep.toString().localeCompare(b.finalRep))}
                                    groupBy={(option) => (option.final !== true) ? 'Простой' : 'Финал'}
                                    getOptionLabel={(option) => option.id}
                                    sx={{ marginLeft: "20px", width: '100px' }}
                                    renderInput={(params) => <TextField {...params} label="След. шаг" variant="standard" />}
                                /> : null}
                            <button type="button" className='ml-2 md:ml-10 text-[#EE2A23]' onClick={handleCloseReplica}>
                                <CloseIcon />
                            </button>
                            {replica4 ?
                                <FormControl error={error4} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                    <FormLabel component="legend" sx={{ color: "#808080", fontSize: "14px", "&.Mui-focused": { color: "#737373" } }}>
                                        Данная реплика ведет к результату:
                                    </FormLabel>
                                    <FormGroup sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        <FormControlLabel
                                            control={<Checkbox checked={unsuccess4} onChange={handleChangeEnd4} name="unsuccess4" />}
                                            label="Неудача"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={success4} onChange={handleChangeEnd4} name="success4" />}
                                            label="Успех"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Выберите 1 вариант (указывается, если после выбора данной реплики следует финальная страница)</FormHelperText>
                                </FormControl> : null}
                        </div> : null}
                    </div>
                    <h1 className='text-[#EE2A23] text-center mb-3'>{errorReplica}</h1>
                    <h1 className='text-[#EE2A23] text-center mb-3'>{errorPOST}</h1>
                    {numberError ? <h1 className='text-[#EE2A23] text-center mb-3'>Введите номер шага!</h1> : null}
                    <button type='submit' className='mt-14 p-3 mb-3 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[250px] md:w-[600px] font-bold uppercase'>
                        Сохранить
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateModal