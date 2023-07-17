import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Info } from './Info';
import { Course } from './Course';
import { productAlfa, productSovcombank, productTinkoff } from '../../data/constants';


export function AdminMenu() {
    const navigate = useNavigate()

    const userName = localStorage.getItem('admin')!
    useEffect(() => {
        if (userName == null) navigate('/adminStart')
    })

    //Открытие/закрытие эл-тов меню
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    //Меню
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);

        if (index === 0)
            setInfo(true)
        else setInfo(false)

        if(index === 1 || index === 2 || index === 3)
        setCourse(true)
        else setCourse(false)
    };

    const [course, setCourse] = useState(false)
    const [info, setInfo] = useState(true)

    const outTheSystem = () => {
        localStorage.removeItem('admin')
        navigate("/adminStart", { replace: true })
    }

    return (
        <>
            <div className='flex flex-row mx-auto w-full font-roboto mb-10 md:mb-36 px-2 md:px-10 h-[80vh] md:h-[85vh]'>
                <div className='shadow-[1px_0_0_rgba(38,38,38,0.6)] pr-1 md:pr-4 min-w-[150px] md:min-w-[350px]'>
                    <div className='flex flex-row justify-between items-center pb-10'>
                        <h1 className='pl-4'>{userName}</h1>
                        <IconButton aria-label="close" sx={{}} onClick={outTheSystem}>
                            <LogoutIcon />
                        </IconButton>
                    </div>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Меню
                            </ListSubheader>
                        }
                    >
                        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                            <ListItemText primary="Информация о продуктах" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClick}>
                            <ListItemText primary="Обучающие курсы" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                                    <ListItemText primary={productAlfa} />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                                    <ListItemText primary={productSovcombank} />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                                    <ListItemText primary={productTinkoff} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </div>
                {info ? <Info /> : null}
                {selectedIndex == 1 ?
                    <>
                        {course ? <Course product={productAlfa} /> : null}
                    </>
                    : null
                }
                {selectedIndex == 2 ?
                    <>
                        {course ? <Course product={productSovcombank} /> : null}
                    </>
                    : null
                }
                {selectedIndex == 3 ?
                    <>
                        {course ? <Course product={productTinkoff} /> : null}
                    </>
                    : null
                }
            </div>
        </>
    )
}