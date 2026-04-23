"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { toast } from "sonner"

import { login, type LoginState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState: LoginState = {
  errors: {},
  message: "",
  success: false,
}

export function LoginForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(login, initialState)

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success("ログインしました")
      const timer = setTimeout(() => {
        router.push("/dashboard")
      }, 800)

      return () => clearTimeout(timer)
    }

    toast.error(state.message)
  }, [state, router])

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="shadcn@example.com"
        />
        <p className="text-muted-foreground text-sm">
          登録したメールアドレスを入力してください
        </p>
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
        />
        <p className="text-muted-foreground text-sm">
          登録したパスワードを入力してください
        </p>
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "送信中..." : "ログイン"}
      </Button>
    </form>
  )
}