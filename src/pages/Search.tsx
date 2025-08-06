import { useParams } from 'react-router-dom'
import { Layout } from '@/components/layout'
import useFetchUser from '@/hooks/useFetchUser'

export default function Search() {
    const { userName } = useParams()
    const { data, isLoading, isError } = useFetchUser(userName)

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error fetching user. Check the username.</p>

    return (
        <Layout.Box className="result-box">
            <img src={data.avatar_url} alt={data.login} className="avatar" />
            <div className="info">
                <h2>{data.name || data.login}</h2>
                <p>{data.bio || 'No bio available'}</p>
                <p>Followers: {data.followers}</p>
                <p>Following: {data.following}</p>
                <p>Public Repos: {data.public_repos}</p>
            </div>
        </Layout.Box>
    )
}