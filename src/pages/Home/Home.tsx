import { Layout } from '@/components/layout'
import { UI } from '@/components/ui'
import { useUserStore } from '@/stores/userStore'
import useFetchUser from '@/hooks/useFetchUser'
import './Home.css'

export default function Home() {
    const { userName } = useUserStore()
    const { setUserName, handleKeyUp } = useFetchUser(userName)

    return (
        <Layout.Box className='home'>
            <Layout.Container>
                <UI.Input
                    placeholder={'Enter GitHub username...'}
                    fullWidth
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
            </Layout.Container>
        </Layout.Box>
    )
}
