'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Failed to load device</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We encountered an error while loading this device. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Back to catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
