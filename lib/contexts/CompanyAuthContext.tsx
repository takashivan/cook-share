"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  setAuthToken,
  clearAuthToken,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
} from "@/lib/api/config";
import type { CompanyUser } from "@/lib/api/companyUser";
import { getApi } from "@/api/api-factory";
import { Companyuser } from "@/api/__generated__/base/Companyuser";

export interface CompanyAuthContextType {
  user: CompanyUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: CompanyUser) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: CompanyUser | null) => void;
  reloadUser: () => Promise<CompanyUser | undefined>;
}

const CompanyAuthContext = createContext<CompanyAuthContextType | undefined>(
  undefined
);

export function CompanyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CompanyUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const companyUserApi = getApi(Companyuser);

  useEffect(() => {
    const currentUser = getCurrentUser("company");
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const updateUser = (userData: CompanyUser | null) => {
    setUser(userData);
    setCurrentUser(userData, "company");
  };

  const reloadUser = async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }
      const userData = await companyUserApi.companyuserDetail(userId);
      if (!userData) {
        throw new Error("User not found");
      }
      updateUser(userData.data as unknown as CompanyUser);

      return userData.data as unknown as CompanyUser;
    } catch (error) {
      console.error("Error reloading user:", error);
      setUser(null);
      setCurrentUser(null, "company");
    }
  };

  const login = async (token: string, userData: CompanyUser) => {
    console.log("Company login called with user:", userData);
    setAuthToken(token, "company");
    updateUser(userData);
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
        setUser,
        reloadUser,
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
