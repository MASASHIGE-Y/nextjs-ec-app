"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { toast } from "sonner"

import { signup, type SignUpState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState: SignUpState = {
  errors: {},
  message: "",
  success: false,
}

export function SignupForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(signup, initialState)

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success("登録が完了しました")
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
        <Label htmlFor="name">ユーザー名</Label>
        <Input id="name" name="name" placeholder="shadcn" />
        <p className="text-muted-foreground text-sm">
          これは表示する名前です
        </p>
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="shadcn@example.com"
        />
        <p className="text-muted-foreground text-sm">
          さまざまな通知をこのメールアドレスで受け取ります
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
          英数字を含めて8文字以上で入力してください
        </p>
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "送信中..." : "登録"}
      </Button>
    </form>
  )
}