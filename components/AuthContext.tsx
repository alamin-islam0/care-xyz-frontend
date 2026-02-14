"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { apiGet, getAuthToken, setAuthToken, removeAuthToken } from "@/lib/api";
import { User, AuthResponse } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (authToken: string, authUser: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getAuthToken();

    async function hydrate() {
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiGet<{ user: User }>("/auth/me", storedToken);
        setTokenState(storedToken);
        setUser(data.user);
      } catch (error) {
        removeAuthToken();
      } finally {
        setLoading(false);
      }
    }

    hydrate();
  }, []);

  function login(authToken: string, authUser: User) {
    setAuthToken(authToken);
    setTokenState(authToken);
    setUser(authUser);
  }

  function logout() {
    removeAuthToken();
    setTokenState(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
