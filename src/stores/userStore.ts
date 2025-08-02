import { create } from 'zustand'
import type { UserStore } from '@/types/user'

export const useUserStore = create<UserStore>((set) => ({
  userName: '',
  setUserName: (userName) => set({ userName }),
}))
