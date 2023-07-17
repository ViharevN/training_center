import React, { useState, useRef, useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, RadioGroup, Radio, Autocomplete, FormControl, FormLabel, FormGroup, FormHelperText, Checkbox } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useGetStepsQuery, useUpdateStepMutation } from '../../../store/api/api';
import { IImage, IPropsEditDeleteModal } from '../../../data/stepsModels';
import { URL } from '../../../data/constants';


const EditModal = (props: IPropsEditDeleteModal) => {
    useEffect(() => {
        if (selectedFile) setUpdateFile(true)
    })
    const [updateStep] = useUpdateStepMutation()
    const { data } = useGetStepsQuery(null)

    const filePicker = useRef<HTMLInputElement>(null)
    const [updateFile, setUpdateFile] = useState(false)

    const [selectedImage, setSelectedImage] = useState('')

    const [valueReplica1, setValueReplica1] = useState('');
    const [valueReplica2, setValueReplica2] = useState('');
    const [valueReplica3, setValueReplica3] = useState('');
    const [valueReplica4, setValueReplica4] = useState('');
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

    const idSteps: string[] = []
    data!.filter(step => step.product === props.step.product && step.id !== props.step.id).map((data) => idSteps.push(data.id))

    const [nav1, setNav1] = useState({ id: '', final: false })
    const [nav2, setNav2] = useState({ id: '', final: false })
    const [nav3, setNav3] = useState({ id: '', final: false })
    const [nav4, setNav4] = useState({ id: '', final: false })
    const [errorNav, setErrorNav] = useState(false)

    const images = [{ style: 'w-[14%] md:w-[15.2%] h-[90%] mx-1', src: 'images/client_normal.svg', alt: 'Клиент в нейтральом состоянии' },
    { style: 'w-[14%] md:w-[14.7%] h-[90%] mx-1', src: 'images/client_greetings.svg', alt: 'Клиент машет рукой' },
    { style: 'w-[14%] md:w-[13.7%] h-[90%] mx-5', src: 'images/client_fsuccess.svg', alt: 'Клиент держит руки на поясе, улыбается' },
    { style: 'w-[14%] md:w-[13.5%] h-[90%] mx-4', src: 'images/client_sad.svg', alt: 'Клиент расстроен' },
    { style: 'w-[14%] md:w-[13.5%] h-[90%] mx-3', src: 'images/client_refused.svg', alt: 'Клиент рассержен' },
    { style: 'w-[14%] md:w-[13.5%] h-[90%] mx-3', src: 'images/client_shocked.svg', alt: 'Клиент удивлен' }]

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        let imageData: IImage | undefined = undefined
        if (selectedImage === "1") imageData = { src: images[0]['src'], alt: images[0]['alt'] }
        else if (selectedImage === "2") imageData = { src: images[1]['src'], alt: images[1]['alt'] }
        else if (selectedImage === "3") imageData = { src: images[2]['src'], alt: images[2]['alt'] }
        else if (selectedImage === "4") imageData = { src: images[3]['src'], alt: images[3]['alt'] }
        else if (selectedImage === "5") imageData = { src: images[4]['src'], alt: images[4]['alt'] }
        else if (selectedImage === "6") imageData = { src: images[5]['src'], alt: images[5]['alt'] }

        if (valueReplica1 !== '' && nav1.id === '') {
            setErrorNav(true)
            return
        } else if (valueReplica1 !== '' && nav1.id !== '') setErrorNav(false)
        if (valueReplica2 !== '' && nav2.id === '') {
            setErrorNav(true)
            return
        }
        else if (valueReplica2 !== '' && nav2.id !== '') setErrorNav(false)
        if (valueReplica3 !== '' && nav3.id === '') {
            setErrorNav(true)
            return
        }
        else if (valueReplica3 !== '' && nav3.id !== '') setErrorNav(false)
        if (valueReplica4 !== '' && nav4.id === '') {
            setErrorNav(true)
            return
        }
        else if (valueReplica4 !== '' && nav4.id !== '') setErrorNav(false)

        if (error1) return
        if (error2) return
        if (error3) return
        if (error4) return

        let stepFormData = new FormData()
        if (updateFile) {
            stepFormData.append('audio', selectedFile!, encodeURIComponent(selectedFile!.name))
        }
        stepFormData.append('id', props.step.id)
        stepFormData.append('replica',
            JSON.stringify({
                replica1: {
                    replica: valueReplica1,
                    navigate: nav1.id,
                    final: finalState,
                    result: resultState
                },
                replica2: {
                    replica: valueReplica2,
                    navigate: nav2.id,
                    final: finalState2,
                    result: resultState2
                },
                replica3: {
                    replica: valueReplica3,
                    navigate: nav3.id,
                    final: finalState3,
                    result: resultState3
                },
                replica4: {
                    replica: valueReplica4,
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
            }))
        stepFormData.append('product', props.step.product)

        updateStep(stepFormData).unwrap().then(() => {
            setErrorReplica('')
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

    const [counter, setCounter] = useState(1)
    const [errorReplica, setErrorReplica] = useState('')
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
                setValueReplica4('')
                setNav4({id:'', final: false})
                setState4({ ...state4, unsuccess4: false, success4: false })
            }
        }
        if (counter === 3) {
            setCounter(counter - 1)
            if (field3) {
                setField3(false)
                setValueReplica3('')
                setNav3({id:'', final: false})
                setState3({ ...state3, unsuccess3: false, success3: false })
            }
        }
        if (counter === 2) {
            setCounter(counter - 1)
            if (field2) {
                setField2(false)
                setValueReplica2('')
                setNav2({id:'', final: false})
                setState2({ ...state2, unsuccess2: false, success2: false })
            }
        }
    }

    useEffect(() => getCurrentRepAndImg(), [])
    const getCurrentRepAndImg = () => {
        let currentReplica = props.step.replica
        setValueReplica1(props.step.replica.replica1.replica)
        setNav1({ id: props.step.replica.replica1.navigate, final: props.step.replica.isEnd! })
        if (currentReplica.replica2?.replica !== "") {
            setField2(true)
            setCounter(2)
            setValueReplica2(props.step.replica.replica2?.replica!)
            setNav2({id: props.step.replica.replica2?.navigate!, final: props.step.replica.isEnd!})
        }
        if (currentReplica.replica3?.replica !== "") {
            setField3(true)
            setCounter(3)
            setValueReplica3(props.step.replica.replica3?.replica!)
            setNav3({id: props.step.replica.replica3?.navigate!, final: props.step.replica.isEnd!})
        }
        if (currentReplica.replica4?.replica !== "") {
            setField4(true)
            setCounter(4)
            setValueReplica4(props.step.replica.replica4?.replica!)
            setNav4({ id: props.step.replica.replica4?.navigate!, final:props.step.replica.isEnd!})
        }

        let images = ['images/client_normal.svg', 'images/client_greetings.svg', 'images/client_fsuccess.svg', 'images/client_sad.svg',
            'images/client_refused.svg', 'images/client_shocked.svg']

        let currentImage = props.step.image_name.src.split(URL)[1]
        if (currentImage === images[0]) setSelectedImage("1")
        else if (currentImage === images[1]) setSelectedImage("2")
        else if (currentImage === images[2]) setSelectedImage("3")
        else if (currentImage === images[3]) setSelectedImage("4")
        else if (currentImage === images[4]) setSelectedImage("5")
        else if (currentImage === images[5]) setSelectedImage("6")

        if (props.step.replica.replica1.final === true && props.step.replica.replica1.result === 'Успех') setState1({ ...state1, unsuccess1: false, success1: true })
        else if (props.step.replica.replica1.final === true && props.step.replica.replica1.result === 'Неудача') setState1({ ...state1, unsuccess1: true, success1: false })
        else if (props.step.replica.replica1.final === false) setState1({ ...state1, unsuccess1: false, success1: false })

        if (props.step.replica.replica2?.final === true && props.step.replica.replica2?.result === 'Успех') setState2({ ...state2, unsuccess2: false, success2: true })
        else if (props.step.replica.replica2?.final === true && props.step.replica.replica2?.result === 'Неудача') setState2({ ...state2, unsuccess2: true, success2: false })
        else if (props.step.replica.replica2?.final === false) setState2({ ...state2, unsuccess2: false, success2: false })

        if (props.step.replica.replica3?.final === true && props.step.replica.replica3?.result === 'Успех') setState3({ ...state3, unsuccess3: false, success3: true })
        else if (props.step.replica.replica3?.final === true && props.step.replica.replica3?.result === 'Неудача') setState3({ ...state3, unsuccess3: true, success3: false })
        else if (props.step.replica.replica3?.final === false) setState3({ ...state3, unsuccess3: false, success3: false })

        if (props.step.replica.replica4?.final === true && props.step.replica.replica4?.result === 'Успех') setState4({ ...state4, unsuccess4: false, success4: true })
        else if (props.step.replica.replica4?.final === true && props.step.replica.replica4?.result === 'Неудача') setState4({ ...state4, unsuccess4: true, success4: false })
        else if (props.step.replica.replica4?.final === false) setState4({ ...state4, unsuccess4: false, success4: false })
    }

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
        } else {
            setFinalState(false)
            setResultState('')
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

    const stepData = [{ "id": "0", "final": false }]
    stepData.pop()
    data!.filter(step => step.product === props.step.product && step.id !== props.step.id).map((data) => stepData.push({ "id": data.id, "final": data.replica.isEnd! }))

    const options = stepData.map((option) => {
        return {
            finalRep: (option.final !== true) ? 'Обычный' : 'Финал',
            ...option,
        };
    });

    return (
        <Dialog open={props.openModal} onClose={props.closeModal} fullWidth maxWidth='lg'>
            <div className="flex flex-row justify-between items-center">
                <DialogTitle sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {props.step.product}⏵ &nbsp;Шаг {props.step.id}
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
                    Настройте изображение клиента, его аудио ответ и ответные реплики.
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
                    <div className="flex flex-col justify-center items-start mt-10">
                        <DialogContentText>
                            Настройка реплик и номеров шагов, на которые они ведут:
                        </DialogContentText>
                        <div className="flex flex-wrap items-end mt-5">
                            <TextField
                                id="standard-multiline-static"
                                label="Ответная реплика 1"
                                multiline
                                rows={2}
                                defaultValue={valueReplica1}
                                variant="standard"
                                onChange={(newValue) => setValueReplica1(newValue.target.value)}
                                sx={{
                                    width: {
                                        lg: "900px",
                                        md: "600px",
                                        sm: '400px',
                                        xs: "300px"
                                    }
                                }}
                            />
                            {valueReplica1 ?
                                <>
                                    <Autocomplete
                                        disablePortal
                                        disableClearable
                                        id="combo-box-step"
                                        isOptionEqualToValue={(idSteps, nav1) => true}
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
                                        <FormLabel component="legend" sx={{ color: "#808080", "&.Mui-focused": { color: "#737373" } }}>
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
                        {field2 ?
                            <div className="flex flex-wrap items-end">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Ответная реплика 2"
                                    multiline
                                    rows={2}
                                    defaultValue={valueReplica2}
                                    variant="standard"
                                    onChange={(newValue) => setValueReplica2(newValue.target.value)}
                                    sx={{
                                        marginTop: "25px", width: {
                                            lg: "900px",
                                            md: "600px",
                                            sm: '400px',
                                            xs: "300px"
                                        }
                                    }}
                                />
                                <button type="button" className='ml-5 mb-3  text-[#EE2A23]' onClick={handleCloseReplica}>
                                    <CloseIcon />
                                </button>
                                {valueReplica2 ?
                                    <>
                                        <Autocomplete
                                            disablePortal
                                            disableClearable
                                            id="combo-box-step-2"
                                            isOptionEqualToValue={(idSteps, nav2) => true}
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
                                        <FormControl error={error2} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                            <FormLabel component="legend" sx={{ color: "#808080", "&.Mui-focused": { color: "#737373" } }}>
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
                        {field3 ?
                            <div className="flex flex-wrap items-end">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Ответная реплика 3"
                                    multiline
                                    rows={2}
                                    defaultValue={valueReplica3}
                                    variant="standard"
                                    onChange={(newValue) => setValueReplica3(newValue.target.value)}
                                    sx={{
                                        marginTop: "25px", width: {
                                            lg: "900px",
                                            md: "600px",
                                            sm: '400px',
                                            xs: "300px"
                                        }
                                    }}
                                />
                                <button type="button" className='ml-5 mb-3  text-[#EE2A23]' onClick={handleCloseReplica}>
                                    <CloseIcon />
                                </button>
                                {valueReplica3 ?
                                    <>
                                        <Autocomplete
                                            disablePortal
                                            disableClearable
                                            id="combo-box-step-3"
                                            isOptionEqualToValue={(idSteps, nav3) => true}
                                            value={nav3}
                                            onChange={(event: any, newValue: { id: string, final: boolean }) => {
                                                setNav3(newValue);
                                            }}
                                            options={options.sort((a, b) => a.finalRep.toString().localeCompare(b.finalRep))}
                                            groupBy={(option) => (option.final !== true) ? 'Простой' : 'Финал'}
                                            getOptionLabel={(option) => option.id}
                                            sx={{ marginLeft: "20px", width: '100px' }}
                                            renderInput={(params) => <TextField {...params} label="След. шаг" variant="standard" />}
                                        />
                                        <FormControl error={error3} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                            <FormLabel component="legend" sx={{ color: "#808080", "&.Mui-focused": { color: "#737373" } }}>
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
                                    </> : null}
                            </div> : null}
                        {field4 ?
                            <div className="flex flex-wrap items-end">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Ответная реплика 4"
                                    multiline
                                    rows={2}
                                    defaultValue={valueReplica4}
                                    variant="standard"
                                    onChange={(newValue) => setValueReplica4(newValue.target.value)}
                                    sx={{
                                        marginTop: "25px", width: {
                                            lg: "900px",
                                            md: "600px",
                                            sm: '400px',
                                            xs: "300px"
                                        }
                                    }}
                                />
                                <button type="button" className='ml-5 mb-3  text-[#EE2A23]' onClick={handleCloseReplica}>
                                    <CloseIcon />
                                </button>
                                {valueReplica4 ?
                                    <>
                                        <Autocomplete
                                            disablePortal
                                            disableClearable
                                            id="combo-box-step-4"
                                            isOptionEqualToValue={(idSteps, nav4) => true}
                                            value={nav4}
                                            onChange={(event: any, newValue: { id: string, final: boolean }) => {
                                                setNav4(newValue);
                                            }}
                                            options={options.sort((a, b) => a.finalRep.toString().localeCompare(b.finalRep))}
                                            groupBy={(option) => (option.final !== true) ? 'Простой' : 'Финал'}
                                            getOptionLabel={(option) => option.id}
                                            sx={{ marginLeft: "20px", width: '100px' }}
                                            renderInput={(params) => <TextField {...params} label="След. шаг" variant="standard" />}
                                        />
                                        <FormControl error={error4} component="fieldset" sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                            <FormLabel component="legend" sx={{ color: "#808080", "&.Mui-focused": { color: "#737373" } }}>
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
                                        </FormControl>
                                    </> : null}
                            </div> : null} {errorNav ? <h1 className='text-[#EE2A23] text-center mb-3 self-center'>Укажите шаг, идущий после реплики</h1> : null}
                        <button type='button' className='self-center p-2 mt-4 mb-3 border border-[#719EFC] hover:border-[#EE2A23] rounded-md'
                            onClick={handleCreateReplica}>
                            Новая реплика
                            <AddIcon sx={{ color: "grey", marginLeft: "15px" }} />
                        </button>
                        <h1 className='text-[#EE2A23] text-center mb-3 self-center'>{errorReplica}</h1>
                    </div>

                    <button type='submit' className='mt-10 p-2 border border-[#719EFC] hover:border-[#EE2A23] rounded-md w-[250px] md:w-[600px] font-bold uppercase'>
                        Сохранить
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditModal