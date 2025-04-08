"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import API from "@/lib/api";
import {
  getCurrentUser,
  setCurrentUser,
  setAuthToken,
  clearAuthToken,
  getAuthToken,
} from "@/lib/api/config";
import type { UserProfile } from "@/lib/api/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (token: string, userData: UserProfile) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ページロード時に localStorage から認証状態を復元
    const token = getAuthToken();
    const currentUser = getCurrentUser();

    if (token && currentUser) {
      setUser(currentUser as UserProfile);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (token: string, userData: UserProfile) => {
    setUser(userData);
    setCurrentUser(userData, "chef");
    setAuthToken(token, "chef");
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearAuthToken("chef");
    localStorage.removeItem("current_user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
