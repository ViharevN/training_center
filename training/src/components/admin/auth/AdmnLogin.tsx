import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type AdminSubmitForm = {
    name: string;
    password: string;
};

export function AdminLogin() {
    useEffect(() => {
        localStorage.removeItem('admin')
    });
    const navigate = useNavigate()

    // const [getAdmin, { data, error, isSuccess }] = useGetAdminMutation()
    const [errorQuery, setErrorQuery] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validationSchemaAuth = Yup.object().shape({
        name: Yup.string()
            .required('Введите имя пользователя')
            .min(2, 'Фамилия не может быть короче 2 символов')
            .max(15, 'Фамилия не может быть диннее 15 символов'),
        password: Yup.string()
            .required('Введите пароль')
            .min(5, 'Пароль не может быть менее 5 символов')
            .max(30, 'Пароль не может быть более 30 символов')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AdminSubmitForm>({
        mode: "onBlur",
        resolver: yupResolver(validationSchemaAuth)
    })

    const onSubmit = async (data: AdminSubmitForm) => {
        const adminData = {
            name: name,
            password: password
        }

        await axios.post("http://localhost:8080/auth/login",
            {
                name: adminData.name,
                password: adminData.password
            }).then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem('admin', adminData.name)
                    navigate('/admin', { replace: true })
                }
            }).catch(function (errors) {
                if (errors.response.data.error === 'User not found')
                    setErrorQuery('Пользователь не найден')
                if (errors.response.data.error === 'Invalid password')
                    setErrorQuery('Неверный пароль')
                if (errors.response.data.error === 'Failed to get user, you can register')
                    setErrorQuery('Пользовтаель не найден, зарегистрируйтесь')
            })
    };

    const handleRegisterClick = () => {
        navigate('/adminRegistration')
    }

    return (
        <div className='flex flex-col font-roboto text-center items-center justify-center my-10 h-[80vh] md:h-[85vh]'>
            <h1 className='text-xl mt-10'>Авторизация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex flex-col w-72 mx-auto'>
                <TextField id="name" label="Имя пользователя" variant="standard" margin="dense" type="text"
                    {...register('name')} value={name} onChange={event => setName(event.target.value = event.target.value)} />
                <div className="text-[#EE2A23] mb-5">{errors.name?.message}</div>
                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        margin='dense'
                        {...register('password')} value={password} onChange={event => setPassword(event.target.value = event.target.value)}
                    />
                </FormControl>
                <div className="text-[#EE2A23]">{errors.password?.message}</div>
                <button type='submit' className='py-2 px-4 mt-14 border border-[#719EFC] rounded-lg hover:border-[#EE2A23] w-36 mx-auto'>
                    Далее
                </button>
                <div className='mt-5 text-gray-500 text-sm'>
                    <h1>Еще нет учетной записи? </h1>
                    <button className='text-[#719EFC] hover:text-[#EE2A23]' onClick={handleRegisterClick}>Регистрация</button>
                </div>
                <h1 className='text-red-600 text-center mt-5'>{errorQuery}</h1>
            </form>
        </div>
    )
}