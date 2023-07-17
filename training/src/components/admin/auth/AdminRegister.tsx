import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type AdminRegSubmitForm = {
    name: string;
    password: string;
    retypePassword: string;
    token: string;
};

export function AdminRegister() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassword, setRetypePassword] = useState('')
    const [token, setToken] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [errorQuery, setErrorQuery] = useState('')
    const [success, setSuccess] = useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClickShowRetypePassword = () => setShowRetypePassword((show) => !show);
    const handleMouseDownRetypePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validationSchemaReg = Yup.object().shape({
        name: Yup.string()
            .required('Введите имя пользователя!')
            .min(2, 'Фамилия не может быть короче 2 символов')
            .max(15, 'Фамилия не может быть диннее 15 символов'),
        password: Yup.string()
            .required('Введите пароль!')
            .min(5, 'Пароль не может быть менее 5 символов')
            .max(30, 'Пароль не может быть более 30 символов'),
        retypePassword: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password')], 'Пароли не совпадают!'),
        token: Yup.string()
            .required('Введите токен!')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AdminRegSubmitForm>({
        mode: "onBlur",
        resolver: yupResolver(validationSchemaReg)
    });

    const onSubmit = async (data: AdminRegSubmitForm) => {
        const adminData = {
            name: name,
            password: password
        }

        await axios.post("http://localhost:8080/auth/registration",
            {
                name: adminData.name,
                password: adminData.password
            }, {headers: {
                "x-approve-token": token
            }}).then(function (response) {
                if(response.status === 200) {
                    setSuccess('Пользователь успешно создан')
                    setErrorQuery('')
                    setName('')
                    setPassword('')
                    setRetypePassword('')
                    setToken('')
                } else setSuccess('')
            }).catch(function (errors) {
                setSuccess('')
                setErrorQuery(errors.response.data.error)
            })
    };
    
    const handleAuthClick = () => {
        navigate('/adminStart')
    } 

    return (
        <div className='flex flex-col font-roboto text-center items-center justify-center my-10 h-[85vh] md:h-[90vh]'>
            <h1 className='text-xl mt-10'>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 flex flex-col w-72 mx-auto mb-10'>
                <TextField id="name" label="Имя пользователя" variant="standard" autoComplete='off' margin="dense" type="text"
                    {...register('name')} value={name} onChange={event => setName(event.target.value)} />
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
                        margin='dense' autoComplete='off'
                        {...register('password')} value={password} onChange={event => setPassword(event.target.value)}
                    />
                </FormControl>
                <div className="text-[#EE2A23]">{errors.password?.message}</div>
                <FormControl variant="standard" sx={{ marginTop: "25px" }}>
                    <InputLabel htmlFor="standard-adornment-password">Повторите пароль</InputLabel>
                    <Input
                        id="standard-adornment-password-retype"
                        type={showRetypePassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowRetypePassword}
                                    onMouseDown={handleMouseDownRetypePassword}
                                >
                                    {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        margin='dense'
                        {...register('retypePassword')} value={retypePassword} onChange={event => setRetypePassword(event.target.value)}
                    />
                </FormControl>
                <div className="text-[#EE2A23]">{errors.retypePassword?.message}</div>
                <TextField id="token" autoComplete='off' label="Регистрационный токен" variant="standard" margin="dense" type="text" sx={{ marginTop: "25px" }}
                    {...register('token')} value={token} onChange={event => setToken(event.target.value)} />
                <div className="text-[#EE2A23] mb-5">{errors.token?.message}</div>
                <h1 className='text-green-500 text-center'>{success}</h1>
                {success? <h1>Для входа перейдите на страницу авторизации</h1>:null}
                <h1 className='text-red-600 text-center'>{errorQuery}</h1>
                <button type='submit' className='py-2 px-4 mt-10 border border-[#719EFC] rounded-lg hover:border-[#EE2A23] w-36 mx-auto'>
                    Далее
                </button>
                <div className='mt-5 text-gray-500 text-sm'>
                    <h1>Уже есть учетная запись? </h1>
                    <button className='text-[#719EFC] hover:text-[#EE2A23]' onClick={handleAuthClick}>Авторизация</button>
                </div>
            </form>
        </div>
    )
}