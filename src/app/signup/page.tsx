import React from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import SignupForm from '@/features/auth/components/SignupForm'

const SignupPage = () => {
  return (
    <div>
      <Card>
  <CardHeader>
    <CardTitle>ユーザー登録</CardTitle>
    <CardDescription>ユーザーを作成してください</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <SignupForm />
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
    </div>
  )
}

export default SignupPage
