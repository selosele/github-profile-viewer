import { create } from 'zustand'
import type { UserStore } from '@/types/user'

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    userName: '',
    setUser: (user) => set({ user }),
    setUserName: (userName) => set({ userName }),
}))
