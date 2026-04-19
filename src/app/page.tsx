"use client"

import { useActionState } from "react"
import { signUp, type SignUpState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const initialState: SignUpState = {
  errors: {},
  message: "",
  success: false,
}

export default function Home() {
  const [state, formAction, pending] = useActionState(signUp, initialState)

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border border-black bg-white p-4">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" />
              {state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
              {state.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              {state.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {state.message && (
              <p className={state.success ? "text-sm text-green-600" : "text-sm text-red-500"}>
                {state.message}
              </p>
            )}

            <Button className="w-full" type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}