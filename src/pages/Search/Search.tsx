import { useParams } from 'react-router-dom'
import { Layout } from '@/components/layout'
import SearchUser from './SearchUser'
import SearchRepository from './SearchRepository'
import './Search.css'

export default function Search() {
    const { userName } = useParams()

    return (
        <Layout.Box className='search'>
            <Layout.Container>
                <SearchUser userName={userName} />
                <SearchRepository />
            </Layout.Container>
        </Layout.Box>
    )
}
