import { FC } from 'react'
import { IPropsPage } from '../data/stepsModels'
import { AdminHeader } from '../components/admin/AdminHeader'
import { Footer } from '../components/Footer'
import { AdminMenu } from '../components/admin/AdminMenu'

const AdminPage: FC<IPropsPage> = ({ children }) => {
    return (
        <div className='container mx-auto max-w-full h-full'>
            <AdminHeader />
            {children}
            <Footer />
        </div>
    )
}

export const AdminMainPage = () => {
    return (
        <>
            <AdminHeader />
            <AdminMenu />
        </>
    )
}

export default AdminPage