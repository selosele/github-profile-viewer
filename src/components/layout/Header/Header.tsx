import { Link } from 'react-router-dom'
import { UI } from '@/components/ui'
import { useUserStore } from '@/stores/userStore'
import type { InputChangeEvent } from '@/types/input'
import Container from '@/components/layout/Container/Container'
import useFetchUser from '@/hooks/useFetchUser'
import './Header.css'

export default function Header() {
    const { userName } = useUserStore()
    const { setUserName, handleKeyUp } = useFetchUser(userName)

    return (
        <header className="header">
            <Container>
                <h1 className="logo">
                    <Link to="/">
                        <span className="icon"><i className="xi-github"></i></span>
                        <span className="text">GitHub Profile Viewer</span>
                    </Link>
                </h1>

                <UI.Input
                    placeholder={'Enter GitHub username...'}
                    className={'type1'}
                    onChange={(e: InputChangeEvent) => setUserName(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
            </Container>
        </header>
    )
}