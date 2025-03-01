"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
//   Component,
//   pageProps: { session, ...pageProps },
children,
}) {
  return (
    <SessionProvider>
     {children}
    </SessionProvider>
  )
}