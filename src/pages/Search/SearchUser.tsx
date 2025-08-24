import { useEffect } from 'react'
import useFetchUser from '@/hooks/useFetchUser'
import { useUserStore } from '@/stores/userStore'

export default function SearchUser({ userName }) {
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
                        <a
                            href={data.avatar_url}
                            target='_blank'
                            title='새 창에서 열립니다'
                        >
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
                                title='새 창에서 열립니다'
                                className='text'
                            >
                                <i className='xi-github'></i>
                                <span>{data.login}</span>
                            </a>
                            <div className='text-box'>
                                <p>{data.bio || 'No bio available'}</p>
                                {data.blog && (
                                    <p>
                                        Website:{' '}
                                        <a
                                            href={`https://${data.blog}`}
                                            target='_blank'
                                            title='새 창에서 열립니다'
                                        >
                                            {data.blog}
                                        </a>
                                    </p>
                                )}
                                <div className='num-box'>
                                    <p>
                                        Following:{' '}
                                        <strong>{data.following}</strong>
                                    </p>
                                    <p>
                                        Followers:{' '}
                                        <strong>{data.followers}</strong>
                                    </p>
                                    <p>
                                        Repos:{' '}
                                        <strong>{data.public_repos}</strong>
                                    </p>
                                    <p>
                                        Gists:{' '}
                                        <strong>{data.public_gists}</strong>
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
