import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json()

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set("session", user.id, {
      httpOnly: true,
      path: "/"
    })

    return res
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}