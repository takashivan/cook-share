"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as companyLogin,
  logout as companyLogout,
  getCompanyProfile,
} from "@/lib/api/companyUser";
import {
  setAuthToken,
  clearAuthToken,
  getCurrentUser,
  setCurrentUser,
  getAuthToken,
  clearCurrentUser,
} from "@/lib/api/config";
import type { CompanyUser } from "@/lib/api/companyUser";

interface CompanyAuthContextType {
  isAuthenticated: boolean;
  user: CompanyUser | null;
  login: (token: string, userData: CompanyUser) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const CompanyAuthContext = createContext<CompanyAuthContextType | undefined>(
  undefined
);

export function CompanyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CompanyUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getAuthToken("company");
        if (token) {
          const currentUser = getCurrentUser("company");
          if (currentUser) {
            setUser(currentUser as CompanyUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (token: string, userData: CompanyUser) => {
    try {
      console.log("Login called with user:", userData);
      setAuthToken(token, "company");
      setCurrentUser(userData, "company");
      setUser(userData);
      setIsAuthenticated(true);
      console.log("User state after login:", userData);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearAuthToken("company");
    clearCurrentUser("company");
  };

  return (
    <CompanyAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}>
      {children}
    </CompanyAuthContext.Provider>
  );
}

export function useCompanyAuth() {
  const context = useContext(CompanyAuthContext);
  if (context === undefined) {
    throw new Error("useCompanyAuth must be used within a CompanyAuthProvider");
  }
  return context;
}
