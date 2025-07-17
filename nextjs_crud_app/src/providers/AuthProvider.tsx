"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export interface User {
  id: string;
  email: string;
  name?: string;
}

type AuthContextType = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "loading",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname?.startsWith("/auth");

  useEffect(() => {
    if (status === "loading") return;

    if (!session && !isAuthPage) {
      router.replace("/auth/login");
    }

    if (session && isAuthPage) {
      router.replace("/");
    }
  }, [status, session, pathname, isAuthPage, router]);

  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!session && !isAuthPage) {
    return null;
  }

  return (
    <AuthContext value={{ user: session?.user || null, status }}>
      {children}
    </AuthContext>
  );
}

export const useAuth = () => useContext(AuthContext);
