import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { InputKeyboardEvent } from '@/types/form'
import type { User } from '@/types/user'
import { useUserStore } from '@/stores/userStore'
import { isNotBlank } from '@/utils/lang'
import { http } from 'api'
import { endpoints } from 'api/endpoints'

export default function useFetchUser(userName: string) {
    const navigate = useNavigate()
    const { setUserName } = useUserStore()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', userName],
        queryFn: async () => await fetchData(),
        enabled: !!userName,
    })

    const fetchData = async () => {
        if (isTestMode()) {
            const res = await fetch('test_data_user.json')
            return res.json() as Promise<User>
        }
        const res = await http.get<User>(endpoints.user(userName))
        return res.data
    }

    const handleKeyUp = (e: InputKeyboardEvent) => {
        if (e.key === 'Enter' && isNotBlank(userName)) {
            navigate(`/${userName.trim()}`)
        }
    }

    const isTestMode = () =>
        import.meta.env.VITE_MODE === 'TEST' && isNotBlank(userName)

    return {
        data,
        isLoading,
        isError,
        setUserName,
        handleKeyUp,
    }
}
