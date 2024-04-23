import { create } from 'zustand'
import { ImageRestore } from '../types'

export type RestoreStore = {
  imagesRestore: ImageRestore[]
}

export const useRestoreStore = create<RestoreStore>((set) => ({
  imagesRestore: [],
  setImagesRestore: (images: ImageRestore[]) => set({ imagesRestore: images }),
}))
