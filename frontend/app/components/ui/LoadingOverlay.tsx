'use client'

export default function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-xl text-white"></span>
        <p className="text-white text-lg font-semibold">{message}</p>
      </div>
    </div>
  )
}
