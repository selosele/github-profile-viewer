import { useQuery } from '@tanstack/react-query'
import type { GetRepositoryRequest, Repository } from '@/types/repository'
import { isNotBlank } from '@/utils/lang'
import { http } from '@/api'

export default function useFetchRepository(
    userName: string,
    params: GetRepositoryRequest
) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['repositories', userName],
        queryFn: async () => await fetchData(),
        enabled: !!userName,
    })

    const fetchData = async () => {
        if (isTestMode()) {
            const res = await fetch('test_data_repository.json')
            return res.json() as Promise<Repository[]>
        }
        const res = await http.get<Repository[]>(`/users/${userName}/repos`, {
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
