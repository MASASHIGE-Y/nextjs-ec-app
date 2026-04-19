import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { logout } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")

  if (!userId) {
    redirect("/login")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border border-black bg-white p-6">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <p className="text-sm text-gray-600">
            You are logged in successfully.
          </p>
        </CardHeader>

        <CardContent>
          <form action={logout}>
            <Button type="submit" className="w-full">
              Log out
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}