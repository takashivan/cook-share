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
} from "@/lib/api/config";
import type { CompanyUser } from "@/lib/api/companyUser";

export interface CompanyAuthContextType {
  user: CompanyUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: CompanyUser) => Promise<void>;
  logout: () => Promise<void>;
}

const CompanyAuthContext = createContext<CompanyAuthContextType | undefined>(
  undefined
);

export function CompanyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CompanyUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const currentUser = await getCurrentUser("company");
        console.log("Initial company user from storage:", currentUser);
        if (currentUser) {
          setUser(currentUser as CompanyUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        localStorage.removeItem("company_current_user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (token: string, userData: CompanyUser) => {
    console.log("Login called with user:", userData);
    setAuthToken(token, "company");
    setUser(userData);
    setCurrentUser(userData, "company");
    setIsAuthenticated(true);
    setIsLoading(false);
    console.log("User state after login:", userData);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(true);
    clearAuthToken("company");
    localStorage.removeItem("company_current_user");
    setIsLoading(false);
  };

  return (
    <CompanyAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
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
