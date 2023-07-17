import React, { FC } from 'react'
import { IPropsReplica } from '../../data/stepsModels'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCreatePersonMutation } from '../../store/api/api'


const Replica: FC<IPropsReplica> = ({ replica, navigateString, result }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [createPerson, {error}] = useCreatePersonMutation()

    const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        const data = event.currentTarget.textContent!

        if (data.search('/./') === -1)
            localStorage.steps = localStorage.steps + ' | ' + data.split('.')[0]
        else if (data.search('/!/') === -1)
            localStorage.steps = localStorage.steps + ' | ' + data.split('!')[0]
        else if (data.search('/?/') === -1)
            localStorage.steps = localStorage.steps + ' | ' + data.split('?')[0]
        else localStorage.steps = localStorage.steps + ' | ' + data

        const postData = async () => {
            let person = JSON.parse(sessionStorage.personData)
            let date = JSON.parse(sessionStorage.dateReg)

            const endDate = new Date().toLocaleString().split(', ')
            const personData = {
                surname: person.surname,
                name: person.name,
                patronymic: person.patronymic,
                phone: person.phone,
                email: person.email,
                date_reg: date.date_reg,
                time_reg: date.time_reg,
                answers: localStorage.getItem('steps'),
                result: result,
                date_end: endDate[0],
                time_end: endDate[1],
                product: person.product
            }
            
            createPerson(personData).unwrap().then(() => {
                navigate(`/${location.pathname.split('/')[1]}/finish${navigateString}`, { replace: true })
            }).catch(() => console.log(error))
        }

        if (result !== undefined || null || '') {
            postData()
        } else if (navigateString !== undefined)
        navigate(`/${location.pathname.split('/')[1]}/step${navigateString}`, { replace: true })
    }
    return (
        <>
            <button
                onClick={handleSelect}
                className='border border-[#719EFC] rounded-lg hover:cursor-pointer hover:border-[#EE2A23] w-full mt-2 md:mt-5'>
                <p className='p-2 md:p-5 text-[0.75rem] md:text-[1rem]'>{replica}</p>
            </button>
        </>
    )
}

export default Replica