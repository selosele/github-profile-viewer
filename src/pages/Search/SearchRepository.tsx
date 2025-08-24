import { useEffect } from 'react'
import { UI } from '@/components/ui'
import { isNotBlank } from '@/utils/lang'
import { dateUtil } from '@/utils/date'
import type { InputKeyboardEvent } from '@/types/input'
import { useUserStore } from '@/stores/userStore'
import { useRepositoryStore } from '@/stores/repositoryStore'
import useFetchRepository from '@/hooks/useFetchRepository'

export default function SearchRepository({ userName }: { userName: string }) {
    const { user } = useUserStore()
    const { searchRepositories, setSearchRepositories } = useRepositoryStore()
    const { data, isLoading, isError } = useFetchRepository(user?.login, {
        sort: 'pushed',
        per_page: user?.public_repos,
    })

    useEffect(() => {
        setSearchRepositories(data)
    }, [data])

    const handleSearch = (e: InputKeyboardEvent) => {
        if (isNotBlank(userName)) {
            return data.filter((d) =>
                d.full_name.includes(e.currentTarget.value)
            )
        }
        return data
    }

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching user. Check the username.</p>}

            {!isLoading && !isError && (
                <div className='repo'>
                    <div className='search-area'>
                        <div className='text-box'>
                            Public Repositories{' '}
                            <p className='num'>
                                {searchRepositories?.length ??
                                    user?.public_repos}
                            </p>
                        </div>
                        <UI.Input
                            placeholder={'Search repository..'}
                            onKeyUp={(e) => {
                                const result = handleSearch(e)
                                setSearchRepositories(result)
                            }}
                        />
                        <div className='result'>
                            {searchRepositories &&
                            searchRepositories.length === 0 ? (
                                <p>No repositories found.</p>
                            ) : (
                                <ul className='repo-list'>
                                    {searchRepositories?.map((repo, index) => (
                                        <li key={index}>
                                            <div className='cont'>
                                                <div className='left'>
                                                    <p className='name'>
                                                        <a
                                                            href={repo.html_url}
                                                            target='_blank'
                                                        >
                                                            {repo.name}
                                                        </a>
                                                    </p>
                                                    <p className='desc'>
                                                        {repo.description}
                                                    </p>
                                                    <p>
                                                        {repo.language && (
                                                            <span className='lang'>
                                                                {repo.language}
                                                            </span>
                                                        )}
                                                        {repo.updated_at && (
                                                            <span className='updated-at'>
                                                                Updated{' '}
                                                                {dateUtil(
                                                                    repo.updated_at
                                                                ).format(
                                                                    'YYYY-MM-DD HH:mm:ss'
                                                                )}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className='right'>
                                                    <div className='num-box'>
                                                        <p>
                                                            <span>
                                                                {repo.stargazers_count.toLocaleString()}
                                                            </span>{' '}
                                                            Stars
                                                        </p>
                                                        <p>
                                                            <span>
                                                                {repo.forks_count.toLocaleString()}
                                                            </span>{' '}
                                                            Forks
                                                        </p>
                                                        <p>
                                                            <span>
                                                                {repo.open_issues_count.toLocaleString()}
                                                            </span>{' '}
                                                            Issues
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
