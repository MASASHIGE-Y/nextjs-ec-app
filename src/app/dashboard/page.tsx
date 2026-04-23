import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { logout } from "@/app/actions"
import { verifyJWT } from "@/lib/session"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {redirect("/login")}

  try {
    await verifyJWT(token)
  } catch {
    redirect("/login")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </main>
  )
}