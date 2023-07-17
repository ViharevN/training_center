import React, { FC, useState } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material'
import { Script } from './Script';
import { useGetStepsQuery } from '../../store/api/api';
import { Loader } from '../Loader';
import CreateModal from './modal/CreateModal';
import PopoverElement from '../Popover';
import CreateFinishModal from './modal/CreateFinishModal.tsx';
import { IPropsCources, ISteps } from '../../data/stepsModels';
import { LinkToCourse } from './LinkToCourse';
import { URL, productAlfa, productSovcombank, productTinkoff } from '../../data/constants';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Course:FC<IPropsCources> = ({product}) => {
    const [openModal, setOpenModal] = useState(false);
    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const [openModalFinish, setOpenModalFinish] = useState(false)
    const handleClickOpenFinish = () => {
        setOpenModalFinish(true);
    };

    const [valueTabs, setValueTabs] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTabs(newValue);
    };
    const { isLoading, data } = useGetStepsQuery(null)

    let linkToCourse = ''
    if (product === productAlfa) linkToCourse = `${URL}alfa`
    else if (product === productSovcombank) linkToCourse = `${URL}halva`
    else if (product === productTinkoff) linkToCourse = `${URL}tinkoff`
    else linkToCourse = 'Ошибка получения ссылки'

    return (
        <div className='flex flex-col w-[400px] sm:w-full'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingLeft: "10px" }}>
                    <Tabs value={valueTabs} onChange={handleChange} aria-label="basic tabs example" sx={{ ".MuiTabs-indicator": { backgroundColor: "#EE2A23" } }}>
                        <Tab label="Сценарий" {...a11yProps(0)} sx={{ color: "#719EFC", textTransform: "none", "&.Mui-selected": { color: "#EE2A23" } }} />
                        <Tab label="Настройка клиента" {...a11yProps(1)} disabled sx={{ color: "#719EFC", textTransform: "none", "&.Mui-selected": { color: "#EE2A23" } }} />
                    </Tabs>
                </Box>
                <TabPanel value={valueTabs} index={0}>
                    <h1 className='text-center text-[1.2rem] md:text-[1.5rem]'>Сценарий</h1>
                    <h1 className='text-center text-[#808080]'>{product}</h1>
                    <div className='flex flex-row items-center mt-2 mb-5 flex-wrap'>
                        <div className='ml-5 mt-3'>
                            <LinkToCourse link={linkToCourse}/>
                        </div>
                        <div className="ml-auto">
                        <button className='mt-3 border-2 rounded-md p-2 ml-5 text-[1rem] border-[#EE2A23] hover:border-[#719EFC]' onClick={handleClickOpen}>
                            Добавить шаг
                        </button>
                        <button className='mt-3 border-2 rounded-md p-2 ml-5 text-[1rem] border-[#EE2A23] hover:border-[#719EFC]' onClick={handleClickOpenFinish}>
                            Добавить финальную страницу
                        </button>
                        </div>
                    </div>
                    <p className='mt-7 mb-3 text-gray-800 ml-5 text-center md:text-left text-[0.9rem] md:text-[1rem]'>Перед вами шаги сценария. Каждый шаг представляет собой веб-страницу, на которую попадает обучающийся. Шаг содержит изображение клиента, аудио и ответные реплики.</p>
                    <div className="flex flex-row flex-wrap ml-5 md:justify-start justify-center">
                        {isLoading ? <Loader /> : data ? data.filter(step => step.replica.isEnd === false && step.product === product).map(step =>
                            <Script
                                key={step.id}
                                step={step}
                            />
                        ) : <h1 className='text-red-600 text-xl'>Ошибка загрузки данных</h1>}
                    </div>
                    <div className='flex flex-row mt-7 ml-5 items-center'>
                        <h1>Финальные страницы</h1>
                        <PopoverElement buttonValue='?' info='Финальные страницы показываются пользователю по окончании прохождения тренажера и не содержат реплик. Здесь можно настроить только изображение клиента, его реплику(если необходимо) и является ли прохождение успешным/неудачным.'/>
                    </div>
                    <div className="flex flex-row flex-wrap ml-5 md:justify-start justify-center mt-3">
                        {isLoading ? <Loader /> : data ? data.filter(step => step.replica.isEnd === true && step.product === product).map(step =>
                            <Script
                                key={step.id}
                                step={step}
                            />
                        ) : <h1 className='text-red-600 text-xl'>Ошибка загрузки данных</h1>}
                    </div>
                </TabPanel>
                <TabPanel value={valueTabs} index={1}>
                    <div className='h-[19.7rem]'>
                        <h1 className='text-center text-2xl'>Настройка параметров клиента</h1>
                        <h1>Уровень сложности:</h1>
                        <div className="flex flex-row justify-around mt-5">
                            <button id='light' className="flex flex-col items-center py-2 border-2 border-[#EE2A23] rounded-md max-w-[200px]">
                                <img className='w-[54%] md:w-[55%] h-[95%]' src="images/levels/Lite.svg" alt="Легкий уровень" />
                                <h1>Легкий</h1>
                            </button>
                            <button id='medium' className="flex flex-col items-center py-2 max-w-[200px]">
                                <img className='w-[54%] md:w-[55%] h-[95%]' src="images/levels/Medium.svg" alt="Средний уровень" />
                                <h1>Средний</h1>
                            </button>
                            <button id='hard' className="flex flex-col items-center py-2 max-w-[200px]">
                                <img className='w-[54%] md:w-[55%] h-[95%]' src="images/levels/Hard.svg" alt="Сложный уровень" />
                                <h1>Сложный</h1>
                            </button>
                        </div>
                        <button className='py-2 px-4 mt-14 border border-[#719EFC] rounded-lg hover:border-[#EE2A23] w-36'>Сохранить</button>
                    </div>
                </TabPanel>
            </Box>
            <CreateModal openModal={openModal} closeModal={() => setOpenModal(false)} product={product}/>
            <CreateFinishModal openModal={openModalFinish} closeModal={() => setOpenModalFinish(false)} product={product}/>
        </div>
    )
}