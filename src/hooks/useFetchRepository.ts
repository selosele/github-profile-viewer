import { useQuery } from '@tanstack/react-query'
import type { GetRepositoryRequest, Repository } from '@/types/repository'
import { isNotBlank } from '@/utils/lang'
import { http } from 'api'
import { endpoints } from 'api/endpoints'

export default function useFetchRepository(
    userName: string,
    params: GetRepositoryRequest
) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['repositories', userName, params.sort, params.per_page],
        queryFn: async () => await fetchData(),
        enabled: !!userName,
    })

    const fetchData = async () => {
        if (isTestMode()) {
            const res = await fetch('test_data_repository.json')
            return res.json() as Promise<Repository[]>
        }
        const res = await http.get<Repository[]>(endpoints.repos(userName), {
            params,
        })
        return res.data
    }

    const isTestMode = () =>
        import.meta.env.VITE_MODE === 'TEST' && isNotBlank(userName)

    return {
        data,
        isLoading,
        isError,
    }
}
