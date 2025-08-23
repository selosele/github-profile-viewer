import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Wrapper.css'

export default function Wrapper() {
    return (
        <>
            <Header />
            <div className='wrapper'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
