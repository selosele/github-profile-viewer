import { useEffect } from 'react'
import { UI } from '@/components/ui'
import { isNotBlank } from '@/utils/lang'
import type { InputKeyboardEvent } from '@/types/input'
import { useUserStore } from '@/stores/userStore'
import { useRepositoryStore } from '@/stores/repositoryStore'
import useFetchRepository from '@/hooks/useFetchRepository'

export default function SearchRepository({ userName }) {
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
                        <p className='text-box'>
                            Public Repositories{' '}
                            <span className='num'>
                                {searchRepositories?.length ??
                                    user?.public_repos}
                            </span>
                        </p>
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
                                <ul>
                                    {searchRepositories?.map((repo, index) => (
                                        <li key={repo.id || index}>
                                            <div>
                                                <p>{repo.name}</p>
                                                <p>{repo.description}</p>
                                                <p>{repo.language}</p>
                                                <p>Updated {repo.updated_at}</p>
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
