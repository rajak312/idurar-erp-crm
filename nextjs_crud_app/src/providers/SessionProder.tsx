"use client";
import { SessionProvider as Provider } from "next-auth/react";
import { ReactNode } from "react";

export interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <Provider>{children}</Provider>;
}
