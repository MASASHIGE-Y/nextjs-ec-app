"use server"

import * as jose from "jose"
import { cookies } from "next/headers"

type JWTPayload = {
  userId: number
  email: string
}

const JWT_SECRET = process.env.JWT_SECRET ?? "invalid"
const ISSUER = "ec-app"
const AUDIENCE = "ec-app-web"

export async function signJWT(payload: JWTPayload): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime("24h")
    .sign(secret)
}

export async function verifyJWT(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  const { payload } = await jose.jwtVerify<JWTPayload>(token, secret, {
    issuer: ISSUER,
    audience: AUDIENCE,
  })

  return payload
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies()

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  })
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value
}

export async function clearAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}