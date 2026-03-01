"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Users,
  Wallet,
  CheckCircle,
} from "lucide-react"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "My Profile", icon: User, path: "/dashboard/profile" },
  { name: "Family Information", icon: Users, path: "/dashboard/profile/family" },
  { name: "Economic Details", icon: Wallet, path: "/dashboard/profile/economic" },
  { name: "Status", icon: CheckCircle, path: "/dashboard/status" },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h2 className="text-xl font-bold text-primary mb-8">
        Community Portal
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Active = pathname === item.path

          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                Active
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-primary/10"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}