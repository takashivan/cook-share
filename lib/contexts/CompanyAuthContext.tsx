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
    const currentUser = getCurrentUser("company");
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (token: string, userData: CompanyUser) => {
    console.log("Company login called with user:", userData);
    setAuthToken(token, "company");
    setUser(userData);
    setCurrentUser(userData, "company");
    setIsAuthenticated(true);
    console.log("Company user state after login:", userData);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    clearAuthToken("company");
    clearCurrentUser("company");
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
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
