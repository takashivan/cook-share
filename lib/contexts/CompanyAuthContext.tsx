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
    const initializeUser = async () => {
      try {
        const token = getAuthToken("company");
        console.log("Checking company auth token:", token);

        if (!token) {
          console.log("No company auth token found");
          setIsLoading(false);
          return;
        }

        try {
          // localStorageからユーザー情報を取得
          const storedUser = getCurrentUser("company");

          if (storedUser) {
            // APIから最新のユーザー情報を取得して検証
            const profile = await getCompanyProfile();
            console.log("Fetched company profile:", profile);

            if (profile && profile.id === storedUser.id) {
              setAuthToken(token, "company");
              setUser(storedUser);
              setIsAuthenticated(true);
              console.log("Company user authenticated:", storedUser);
            } else {
              console.log(
                "Company profile validation failed, clearing auth state"
              );
              clearAuthToken("company");
              clearCurrentUser("company");
            }
          } else {
            console.log("No stored user found, clearing auth state");
            clearAuthToken("company");
            clearCurrentUser("company");
          }
        } catch (error) {
          console.error("Error validating company profile:", error);
          clearAuthToken("company");
          clearCurrentUser("company");
        }
      } catch (error) {
        console.error("Error initializing company user:", error);
        clearAuthToken("company");
        clearCurrentUser("company");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (token: string, userData: CompanyUser) => {
    console.log("Company login called with user:", userData);
    setAuthToken(token, "company");
    setUser(userData);
    setCurrentUser(userData, "company");
    setIsAuthenticated(true);
    setIsLoading(false);
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
    <CompanyAuthContext.Provider value={value}>
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
