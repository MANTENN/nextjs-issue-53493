import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center">
      <div className="rounded-full border-muted bg-muted/90 p-3 shadow-lg backdrop-blur">
        <Loader2 className="h-10 w-10 animate-spin" strokeWidth={2.75} />
      </div>
    </div>
  )
}
