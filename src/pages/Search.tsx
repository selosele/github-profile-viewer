import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { UI } from '@/components/ui'
import useFetchUser from '@/hooks/useFetchUser'
import useFetchRepository from '@/hooks/useFetchRepository'
import { useRepositoryStore } from '@/stores/repositoryStore'
import './Search.css'

export default function Search() {
    const { userName } = useParams()
    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useFetchUser(userName)
    const {
        data: repositories,
        isLoading: isRepositoryLoading,
        isError: isRepositoryError,
        handleKeyUp,
    } = useFetchRepository(user?.login, { sort: 'pushed' })

    const { searchRepositories, setSearchRepositories } = useRepositoryStore()

    useEffect(() => {
        setSearchRepositories(repositories)
    }, [repositories])

    const isLoading = () => isUserLoading || isRepositoryLoading
    const isError = () => isUserError || isRepositoryError

    return (
        <Layout.Box className='search'>
            <Layout.Container>
                {isLoading() && <p>Loading...</p>}
                {isError() && <p>Error fetching user. Check the username.</p>}

                {!isLoading() && !isError() && (
                    <>
                        <div className='profile'>
                            <div className='avatar'>
                                <a
                                    href={user.avatar_url}
                                    target='_blank'
                                    title='새 창에서 열립니다'
                                >
                                    <img
                                        src={user.avatar_url}
                                        alt={user.login}
                                        className='img'
                                    />
                                </a>
                            </div>
                            <div className='info'>
                                <h2 className='title'>
                                    {user.name || user.login}
                                </h2>
                                <div className='about'>
                                    {user.location && (
                                        <p className='text'>
                                            <i className='xi-maker'></i>{' '}
                                            {user.location}
                                        </p>
                                    )}
                                    <a
                                        href={user.html_url}
                                        target='_blank'
                                        title='새 창에서 열립니다'
                                        className='text'
                                    >
                                        <i className='xi-github'></i>
                                        <span>{user.login}</span>
                                    </a>
                                    <div className='text-box'>
                                        <p>{user.bio || 'No bio available'}</p>
                                        {user.blog && (
                                            <p>
                                                Website:{' '}
                                                <a
                                                    href={`https://${user.blog}`}
                                                    target='_blank'
                                                    title='새 창에서 열립니다'
                                                >
                                                    {user.blog}
                                                </a>
                                            </p>
                                        )}
                                        <div className='num-box'>
                                            <p>
                                                Following:{' '}
                                                <strong>
                                                    {user.following}
                                                </strong>
                                            </p>
                                            <p>
                                                Followers:{' '}
                                                <strong>
                                                    {user.followers}
                                                </strong>
                                            </p>
                                            <p>
                                                Repos:{' '}
                                                <strong>
                                                    {user.public_repos}
                                                </strong>
                                            </p>
                                            <p>
                                                Gists:{' '}
                                                <strong>
                                                    {user.public_gists}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='repo'>
                            <div className='search-area'>
                                <p className='text-box'>
                                    Public Repositories{' '}
                                    <span className='num'>
                                        {searchRepositories?.length ??
                                            user.public_repos}
                                    </span>
                                </p>
                                <UI.Input
                                    placeholder={'Search repository..'}
                                    onKeyUp={(e) => {
                                        const result = handleKeyUp(e)
                                        setSearchRepositories(result)
                                    }}
                                />
                                <div className='result'>
                                    {searchRepositories?.length === 0 ? (
                                        <p>No repositories found.</p>
                                    ) : (
                                        <ul>
                                            {searchRepositories?.map(
                                                (repo, index) => (
                                                    <li key={repo.id || index}>
                                                        <div>
                                                            <p>{repo.name}</p>
                                                            <p>
                                                                {
                                                                    repo.description
                                                                }
                                                            </p>
                                                            <p>
                                                                {repo.language}
                                                            </p>
                                                            <p>
                                                                Updated{' '}
                                                                {
                                                                    repo.updated_at
                                                                }
                                                            </p>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Layout.Container>
        </Layout.Box>
    )
}
