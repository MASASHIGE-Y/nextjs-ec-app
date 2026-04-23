import { AuthCardLayout } from "@/components/auth/AuthCardLayout"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <AuthCardLayout
      title="ログイン"
      description="ログインしてください"
      footer={
        <p className="mt-5 text-center text-sm">
          アカウントをお持ちでない場合は{" "}
          <a href="/signup" className="text-blue-600 underline">
            こちら
          </a>
        </p>
      }
    >
      <LoginForm />
    </AuthCardLayout>
  )
}