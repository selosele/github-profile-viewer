import { useNavigate } from 'react-router-dom'
import type { InputKeyboardEvent } from '@/types/input'
import { isNotBlank } from '@/utils/lang'
import { useUserStore } from '@/stores/userStore'

export default function useFetchUser() {
    const navigate = useNavigate()
    const { userName, setUserName } = useUserStore()

    const handleKeyUp = (e: InputKeyboardEvent) => {
        if (e.key === 'Enter' && isNotBlank(userName)) {
            navigate(`/${userName.trim()}`)
        }
    }

    return { setUserName, handleKeyUp }
}
