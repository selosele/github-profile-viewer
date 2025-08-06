import { Layout } from '@/components/layout'
import { UI } from '@/components/ui'
import { useUserStore } from '@/stores/userStore'
import useFetchUser from '@/hooks/useFetchUser'
import './Home.css'

export default function Home() {
    const { userName } = useUserStore()
    const { setUserName, handleKeyUp } = useFetchUser(userName)

    return (
        <div className='home'>
            <Layout.Box className='home-box'>
                <UI.Input
                    placeholder={'Enter GitHub username...'}
                    fullWidth
                    className={'type2'}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
            </Layout.Box>
        </div>
    )
}
