import { TextField} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';
import { productAlfa, productSovcombank, productTinkoff } from '../data/constants';

type UserSubmitForm = {
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    email: string;
    agreement:boolean;
};

export function LoginForm() {
    useEffect(() => {
        sessionStorage.clear()
    },[])
    const navigate = useNavigate()

    const ruRegex = /[^a-zA-Z\-\s]/;
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const validationSchema = Yup.object().shape({
        surname: Yup.string()
            .required('Введите фамилию')
            .min(2, 'Фамилия не может быть короче 2 символов')
            .max(15, 'Фамилия не может быть диннее 15 символов')
            .matches(ruRegex, 'Используйте только кириллицу'),
        name: Yup.string()
            .required('Введите имя')
            .min(2, 'Имя не может быть короче 2 букв')
            .max(15, 'Имя не может быть диннее 15 букв')
            .matches(ruRegex, 'Используйте только кириллицу'),
        patronymic: Yup.string()
            .notRequired().test('patronymic', 'Используйте только кириллицу', function(value) {
                if (!!value) {
                    const schema = Yup.string().matches(ruRegex);
                    return schema.isValidSync(value);
                } return true;
            })
            .test('empty-check', 'Отчество не может быть короче 2 символов',
                patronymic => !patronymic || patronymic.length >= 2)
            .max(15, 'Отчество не может быть диннее 15 символов'),
        phone: Yup.string()
            .test('check-length2', 'Введите номер телефона', () => {
                if(phone.replace(/-|_|\s/g, "").length === 12)
                return true;
            }),            
        email: Yup.string()
            .required('Введите адрес электронной почты')
            .matches(emailRegex, 'Неверный адрес электронной почты')
            .email('Неверный адрес электронной почты'),
        agreement:  Yup.boolean().test("agreement", "Вам необходимо дать согласие на обработку персональных данных", (val) => {
            return val;
        }),
        
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<UserSubmitForm>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data: UserSubmitForm) => {
        const pathName = window.location.pathname
        let product
        if(pathName === '/alfa') product = productAlfa
        if(pathName === '/halva') product = productSovcombank
        if(pathName === '/tinkoff') product = productTinkoff
        
        const personData = {
            surname: surname,
            name: name,
            patronymic: patronymic,
            phone: phone,
            email: email,
            product: product
        }
        sessionStorage.setItem('personData', JSON.stringify(personData))
      
        navigate(`${pathName}/step0`, {replace: true})
    };

    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')


    return (
       <div className='mx-auto max-w-2xl font-roboto text-center mt-10 mb-40'>
        <div className=''>
            <h1 className='text-[28px] text-[#EE2A23]'>Заполните анкету</h1>
            <h1 className='font-light text-[18px]'>Чтобы получить доступ</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}  className='mt-5 flex flex-col w-72 mx-auto'> 
            <TextField id="surname" label="Фамилия" variant="standard" margin="dense" type="text" 
            {...register('surname')} value = {surname} onChange={event=>setSurname(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))}/>
            <div className="text-[#EE2A23] text-[14px]">{errors.surname?.message}</div>
            <TextField id="name" label="Имя" variant="standard" margin="dense" type="text"
            {...register('name')} value = {name} onChange={event=>setName(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))}/>
             <div className="text-[#EE2A23]">{errors.name?.message}</div>
            <TextField id="patronymic" label="Отчество" variant="standard" margin="dense" type="text" 
            {...register('patronymic')} value = {patronymic} onChange={event=>setPatronymic(event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))}/>
             <div className="text-[#EE2A23]">{errors.patronymic?.message}</div>
            <InputMask mask="+7 999 999-99-99" 
            {...register('phone')} value={phone} onChange={event => setPhone(event.target.value)}>
                <TextField id="phone" label="Телефон" variant="standard" margin="dense"/>
            </InputMask>
            <div className="text-[#EE2A23]">{errors.phone?.message}</div>
            <TextField id="email" label="Электронная почта" variant="standard" margin="dense" type="email"
            {...register('email')} value = {email} onChange={event=>setEmail(event.target.value)}/>
            <div className="text-[#EE2A23]">{errors.email?.message}</div>
            <div className="flex flex-row w-[355px] self-center mt-10">
            <FormControlLabel
                control={
                <Controller
                    name="agreement"
                    control={control}
                    render={({ field }) => <Checkbox {...field} />}
                />
                }
                label=""
                sx={{marginRight: "10px", color: "#719EFC", '&& .Mui-checked': { color: "#719EFC"}}}
             />
            <p className='text-left text-[0.95rem]'>Нажимая на кнопку, Вы даете 
                <a href='Согласие_на_обработку_персональных_данных_Голосовой_тренажер.pdf' target='_blank' className='text-[#719EFC] hover:text-[#EE2A23]'>
                    &nbsp;согласие на обработку персональных данных
                </a>
            </p>  
            </div>
            {errors?.agreement && <div className="text-[#EE2A23] w-full md:w-[550px] self-center mt-3 px-5">{errors.agreement?.message}</div>}
            <button type='submit' className='py-2 px-4 mt-14 border border-[#719EFC] rounded-lg hover:border-[#EE2A23] w-36 mx-auto'>
                Далее
            </button>
        </form>
       </div>
    )
}