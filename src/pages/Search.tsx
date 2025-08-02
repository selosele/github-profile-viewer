import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/types/user'
import { http } from '@/api'
import Box from '@/components/layout/Box/Box'

export default function Search() {
    const { userName } = useParams()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', userName],
        queryFn: async () => {
            const res = await http.get(`/users/${userName}`) as User
            return res

            // const res = await fetch('test_data.json')
            // return res.json() as Promise<User>
        },
        enabled: !!userName,
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error fetching user. Check the username.</p>

    return (
        <Box className="result-box">
            <img src={data.avatar_url} alt={data.login} className="avatar" />
            <div className="info">
                <h2>{data.name || data.login}</h2>
                <p>{data.bio || 'No bio available'}</p>
                <p>Followers: {data.followers}</p>
                <p>Following: {data.following}</p>
                <p>Public Repos: {data.public_repos}</p>
            </div>
        </Box>
    )
}