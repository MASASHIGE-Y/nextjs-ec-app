import { AuthCardLayout } from "@/components/auth/AuthCardLayout"
import { SignupForm } from "@/components/auth/SignupForm"

export default function SignupPage() {
  return (
    <AuthCardLayout
      title="ユーザー登録"
      description="ユーザーを作成してください"
    >
      <SignupForm />
    </AuthCardLayout>
  )
}