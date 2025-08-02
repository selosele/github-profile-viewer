import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { InputKeyboardEvent } from '@/types/input'
import type { User } from '@/types/user'
import { useUserStore } from '@/stores/userStore'
import { isNotBlank } from '@/utils/lang'
import { http } from '@/api'
import { MODES } from '@/constants/mode'

export default function useFetchUser(userName: string) {
    const navigate = useNavigate()
    const { setUserName } = useUserStore()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', userName],
        queryFn: async () => await fetchData(),
        enabled: !!userName,
    })

    const fetchData = async (mode?: string) => {
        if (isTestMode(mode)) {
            const res = await fetch('test_data.json')
            return res.json() as Promise<User>
        }
        const res = await http.get(`/users/${userName}`) as User
        return res
    }

    const handleKeyUp = (e: InputKeyboardEvent) => {
        if (e.key === 'Enter' && isNotBlank(userName)) {
            navigate(`/${userName.trim()}`)
        }
    }

    const isTestMode = (mode: string) => isNotBlank(mode) && mode === MODES.TEST && isNotBlank(userName)

    return {
        data,
        isLoading,
        isError,
        setUserName,
        handleKeyUp
    }
}
