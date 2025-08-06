import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Container from '../Container/Container'
import Footer from '../Footer/Footer'
import './Wrapper.css'

export default function Wrapper() {
    return (
        <>
            <Header />
            <Container className='wrapper'>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}
