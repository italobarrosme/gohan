import { create } from 'zustand'

export type LoadingGlobalState = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useLoadingGlobal = create<LoadingGlobalState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}))
