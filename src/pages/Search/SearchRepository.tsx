import { useEffect, useState } from 'react'
import { UI } from '@/components/ui'
import { isNotBlank } from '@/utils/lang'
import { dateUtil } from '@/utils/date'
import type { CheckboxChangeEvent, InputKeyboardEvent } from '@/types/form'
import { useUserStore } from '@/stores/userStore'
import { useRepositoryStore } from '@/stores/repositoryStore'
import useFetchRepository from '@/hooks/useFetchRepository'

export default function SearchRepository() {
    const [sort, setSort] = useState<string>('pushed')
    const [include, setInclude] = useState<string[]>(['forked', 'archived'])
    const [searchKeyword, setSearchKeyword] = useState<string>()

    const { user } = useUserStore()
    const { searchRepositories, setSearchRepositories } = useRepositoryStore()
    const { data, isLoading, isError } = useFetchRepository(user?.login, {
        sort: sort,
        per_page: user?.public_repos,
    })

    const filterRepositories = () => {
        if (!data) return []

        return data.filter((repo) => {
            const matchKeyword = isNotBlank(searchKeyword)
                ? repo.full_name
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase())
                : true

            const matchForked = include.includes('forked') || !repo.fork
            const matchArchived = include.includes('archived') || !repo.archived

            return matchKeyword && matchForked && matchArchived
        })
    }

    useEffect(() => {
        setSearchRepositories(filterRepositories())
    }, [data, include, searchKeyword])

    const handleCheck = (e: CheckboxChangeEvent) => {
        const { checked, value } = e.target
        const nextInclude = checked
            ? [...include, value]
            : include.filter((v) => v !== value)
        setInclude(nextInclude)
    }

    const handleSearch = (e: InputKeyboardEvent) => {
        setSearchKeyword(e.currentTarget.value)
    }

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching user. Check the username.</p>}

            {!isLoading && !isError && (
                <div className='repo'>
                    <div className='search-area'>
                        <div className='top'>
                            <div className='text-box'>
                                Public Repositories{' '}
                                <p className='num'>
                                    {searchRepositories?.length ??
                                        user?.public_repos}
                                </p>
                            </div>
                            <div>
                                <UI.Select
                                    id={'sortBy'}
                                    label={'Sort by:'}
                                    value={sort}
                                    data={[
                                        { value: 'pushed', text: 'Pushed' },
                                        { value: 'updated', text: 'Updated' },
                                        { value: 'created', text: 'Created' },
                                    ]}
                                    onChange={(e) => setSort(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='bottom'>
                            <UI.Input
                                placeholder={'Search repository..'}
                                onKeyUp={handleSearch}
                            />
                            <div>
                                <UI.CheckboxGroup
                                    label={'Include:'}
                                    style={{ width: '15.2rem' }}
                                >
                                    <UI.Checkbox
                                        checked={include.includes('forked')}
                                        value={'forked'}
                                        text={'Forked'}
                                        onChange={handleCheck}
                                    />
                                    <UI.Checkbox
                                        checked={include.includes('archived')}
                                        value={'archived'}
                                        text={'Archived'}
                                        onChange={handleCheck}
                                    />
                                </UI.CheckboxGroup>
                            </div>
                        </div>
                        <div className='result'>
                            {searchRepositories &&
                            searchRepositories.length === 0 ? (
                                <p className='no-data'>
                                    No repositories found.
                                </p>
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
                                                        {repo.fork && (
                                                            <span className='fork'>
                                                                Forked
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
