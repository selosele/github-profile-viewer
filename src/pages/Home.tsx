import { Layout } from '@components/layout'
import { UI } from '@/components/ui'
import useFetchUser from '@/hooks/useFetchUser'
import './Home.css'

export default function Home() {
    const { setUserName, handleKeyUp } = useFetchUser()

    return (
        <div className="home">
            <Layout.Container>
                <Layout.Box className="home-box">
                    <UI.Input
                        placeholder={'Enter GitHub username...'} fullWidth
                        className={'type2'}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                </Layout.Box>
            </Layout.Container>
        </div>
    )
}