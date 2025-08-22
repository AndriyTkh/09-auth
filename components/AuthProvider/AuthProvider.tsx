"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/api";

const privateRoutes = ['/profile', '/notes', '/dashboard'];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, setUser, clearIsAuthenticated, loading, setLoading } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      try {
        const userData = await checkSession();
        if (userData) {
          setUser(userData);
        } else {
          clearIsAuthenticated();
          if (isPrivateRoute) {
            router.push('/sign-in');
          }
        }
      } catch (error) {
        clearIsAuthenticated();
        if (isPrivateRoute) {
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearIsAuthenticated, setLoading, isPrivateRoute, router]);

  useEffect(() => {
    if (!loading && isPrivateRoute && !isAuthenticated) {
      clearIsAuthenticated();
      router.push('/sign-in');
      return;
    }
  }, [isAuthenticated, isPrivateRoute, loading, clearIsAuthenticated, router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
