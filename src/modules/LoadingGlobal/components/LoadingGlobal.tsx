'use client'
import { useLoadingGlobal } from '../store/useLoadingGlobal'

export const LoadingGlobal = () => {
  const { loading } = useLoadingGlobal()

  return (
    <div>
      {loading && (
        <div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-gray-900/40">
          <div className="rounded-lg bg-white p-4 text-center shadow-lg">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
