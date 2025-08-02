import { Link } from 'react-router-dom'
import { ui } from '@components/ui'
import Container from '@components/layout/Container/Container'
import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <Container>
                <h1 className="logo">
                    <Link to="/">
                        <span className="icon"><i className="xi-github"></i></span>
                        <span className="text">GitHub Profile Viewer</span>
                    </Link>
                </h1>

                <ui.Input
                    placeholder={'Enter GitHub username...'}
                    className={'type1'}
                />
            </Container>
        </header>
    )
}