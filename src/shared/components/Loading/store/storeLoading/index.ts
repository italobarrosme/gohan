import { create } from 'zustand'

type StoreLoading = {
  store: {
    isLoading: boolean
  }
  setLoading: (isLoading: boolean) => void
}

export const storeLoading = create<StoreLoading>((set) => ({
  // State
  store: {
    isLoading: false,
  },

  // Actions
  setLoading: (isLoading: boolean) => {
    if (!isLoading) {
      setTimeout(() => {
        set(() => ({
          store: {
            isLoading: false,
          },
        }))
      }, 1000)
    } else {
      set(() => ({
        store: {
          isLoading: true,
        },
      }))
    }
  },
}))
