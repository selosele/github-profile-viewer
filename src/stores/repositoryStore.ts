import { create } from 'zustand'
import type { RepositoryStore } from '@/types/repository'

export const useRepositoryStore = create<RepositoryStore>((set) => ({
    searchRepositories: [],
    setSearchRepositories: (searchRepositories) => set({ searchRepositories }),
}))
