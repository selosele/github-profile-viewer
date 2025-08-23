import { useQuery } from '@tanstack/react-query'
import type { InputKeyboardEvent } from '@/types/input'
import type { GetRepositoryRequest, Repository } from '@/types/repository'
import { isNotBlank } from '@/utils/lang'
import { http } from '@/api'
import { MODES } from '@/constants/modes'

export default function useFetchRepository(
    userName: string,
    params: GetRepositoryRequest
) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['repositories', userName],
        queryFn: async () => await fetchData(MODES.TEST),
        enabled: !!userName,
    })

    const fetchData = async (mode?: string) => {
        if (isTestMode(mode)) {
            const res = await fetch('test_data_repository.json')
            return res.json() as Promise<Repository[]>
        }
        const res = await http.get<Repository[]>(`/users/${userName}/repos`, {
            params,
        })
        return res.data
    }

    const handleKeyUp = (e: InputKeyboardEvent) => {
        if (isNotBlank(userName)) {
            return data.filter((d) =>
                d.full_name.includes(e.currentTarget.value)
            )
        }
    }

    const isTestMode = (mode: string) =>
        isNotBlank(mode) && mode === MODES.TEST && isNotBlank(userName)

    return {
        data,
        isLoading,
        isError,
        handleKeyUp,
    }
}
