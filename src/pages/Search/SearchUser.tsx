import { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import useFetchUser from '@/hooks/useFetchUser'
import { dateUtil } from '@/utils/date'

export default function SearchUser({ userName }: { userName: string }) {
    const { data, isLoading, isError } = useFetchUser(userName)
    const { setUser } = useUserStore()

    useEffect(() => {
        setUser(data)
    }, [data])

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching user. Check the username.</p>}

            {!isLoading && !isError && (
                <div className='profile'>
                    <div className='avatar'>
                        <a href={data.avatar_url} target='_blank'>
                            <img
                                src={data.avatar_url}
                                alt={data.login}
                                className='img'
                            />
                        </a>
                    </div>
                    <div className='info'>
                        <h2 className='title'>{data.name || data.login}</h2>
                        <div className='about'>
                            {data.location && (
                                <p className='text'>
                                    <i className='xi-maker'></i> {data.location}
                                </p>
                            )}
                            <a
                                href={data.html_url}
                                target='_blank'
                                className='text'
                            >
                                <i className='xi-github'></i>
                                <span>{data.login}</span>
                            </a>
                            <div className='text-box'>
                                {data.bio && <p>{data.bio}</p>}
                                {data.company && <p>Company: {data.company}</p>}
                                {data.blog && (
                                    <p>
                                        Website:{' '}
                                        <a
                                            href={`https://${data.blog}`}
                                            target='_blank'
                                        >
                                            {data.blog}
                                        </a>
                                    </p>
                                )}
                                {data.email && <p>Email: {data.email}</p>}
                                {data.twitter_username && (
                                    <p>
                                        Twitter:{' '}
                                        <a
                                            href={`https://twitter.com/${data.twitter_username}`}
                                            target='_blank'
                                        >
                                            @{data.twitter_username}
                                        </a>
                                    </p>
                                )}
                                <p>
                                    GitHub member since{' '}
                                    {dateUtil(data.created_at).format('YYYY')}
                                </p>
                                <div className='num-box'>
                                    <p>
                                        Following:{' '}
                                        <strong>
                                            {data.following.toLocaleString()}
                                        </strong>
                                    </p>
                                    <p>
                                        Followers:{' '}
                                        <strong>
                                            {data.followers.toLocaleString()}
                                        </strong>
                                    </p>
                                    <p>
                                        Repos:{' '}
                                        <strong>
                                            {data.public_repos.toLocaleString()}
                                        </strong>
                                    </p>
                                    <p>
                                        Gists:{' '}
                                        <strong>
                                            {data.public_gists.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
