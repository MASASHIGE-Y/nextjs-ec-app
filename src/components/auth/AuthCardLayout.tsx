import { ReactNode } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type AuthCardLayoutProps = {
  title: string
  description: string
  footer?: ReactNode
  children: ReactNode
}

export function AuthCardLayout({
  title,
  description,
  footer,
  children,
}: AuthCardLayoutProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-start justify-center px-4 pt-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>

        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </main>
  )
}