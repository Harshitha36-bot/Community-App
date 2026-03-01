"use client"

export default function Header() {
  return (
    <header className="bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-sm font-medium text-zinc-600">
        Community App
      </h1>
      <div className="text-xs text-zinc-500">
        Last login: Today, 9:30 AM
      </div>
    </header>
  )
}