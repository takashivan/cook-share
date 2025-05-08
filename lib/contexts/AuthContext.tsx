"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getCurrentUser,
  setCurrentUser,
  setAuthToken,
  clearAuthToken,
  getAuthToken,
} from "@/lib/api/config";
import type { UserProfile } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { login, logout, getUserProfile } from "@/lib/api/user";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const initAuth = async () => {
    try {
      const token = getAuthToken();
      if (token) {
        const userData = await getCurrentUser();
        if (userData) {
          const fullProfile = await getUserProfile(userData.id);
          setUser(fullProfile);
          setCurrentUser(fullProfile, "chef");
          setIsAuthenticated(true);
        } else {
          clearAuthToken();
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      clearAuthToken();
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { sessionToken, user } = await login({
        email,
        password,
      });
      setAuthToken(sessionToken, "chef");
      const fullProfile = await getUserProfile(user.id);
      setUser(fullProfile);
      setCurrentUser(fullProfile, "chef");
      localStorage.setItem("user", JSON.stringify(fullProfile));
      setIsAuthenticated(true);
      router.push("/chef/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    clearAuthToken();
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login: handleLogin,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
