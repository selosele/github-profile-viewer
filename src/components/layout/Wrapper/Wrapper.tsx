import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Container from '../Container/Container'
import Footer from '../Footer/Footer'

export default function Wrapper() {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}
