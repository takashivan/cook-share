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
import type { CompanyUserData } from "@/lib/api/companyUser";
import { getApi } from "@/api/api-factory";
import { Companyuser } from "@/api/__generated__/base/Companyuser";
import { CompanyusersPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";
import { Companyusers } from "@/api/__generated__/base/Companyusers";
import { Auth } from "@/api/__generated__/company/Auth";
import { LoginCreateData, SignupCreatePayload } from "@/api/__generated__/company/data-contracts";
import { useSWRConfig } from "swr";

export interface CompanyAuthContextType {
  user: LoginCreateData["user"] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginCreateData["user"]>;
  logout: () => void;
  register: (data: CompanyUserData) => Promise<void>;
  update: (data: Partial<CompanyusersPartialUpdatePayload>) => Promise<void>;
  changeEmail: (email: string) => Promise<void>;
  confirmEmail: (token: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  setUser: (user: LoginCreateData["user"] | null) => void;
  reloadUser: () => Promise<LoginCreateData["user"] | undefined>;
}

const CompanyAuthContext = createContext<CompanyAuthContextType | undefined>(
  undefined
);

export function CompanyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginCreateData["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useSWRConfig()

  useEffect(() => {
    const currentUser = getCurrentUser("company");
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const saveUser = (userData: LoginCreateData["user"] | null) => {
    setUser(userData);
    setCurrentUser(userData, "company");
  };

  const reloadUser = async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      const companyUserApi = getApi(Companyuser);
      const userData = await companyUserApi.companyuserDetail(userId, {
        headers: {
          "X-User-Type": "company"
        }
      });
      if (!userData) {
        throw new Error("User not found");
      }

      saveUser(userData.data);

      return userData.data;
    } catch (error) {
      console.error("Error reloading user:", error);
      setUser(null);
      setCurrentUser(null, "company");
    }
  };

  const setAuth = (token: string,  userData: LoginCreateData["user"]) => {
    setAuthToken(token, "company");
    saveUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const authApi = getApi(Auth);
      const { data } = await authApi.loginCreate({
        email,
        password,
      });
      setAuth(data.sessionToken, data.user);
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    clearAuthToken("company");
    clearCurrentUser("company");
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    // SWRで管理するすべてのキャッシュをクリア
    mutate(
      key => true,
      undefined,
      { revalidate: false }
    )
  };

  const handleRegister = async (data: SignupCreatePayload) => {
    try {
      const authApi = getApi(Auth);
      const { data: newData } = await authApi.signupCreate(data);
      setAuth(newData.sessionToken, newData.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleUpdate = async (data: Partial<CompanyusersPartialUpdatePayload>) => {
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      const companyUsersApi = getApi(Companyusers);
      const response = await companyUsersApi.companyusersPartialUpdate(userId, data as CompanyusersPartialUpdatePayload, {
        headers: {
          "X-User-Type": "company"
        }
      });
      if (response) {
        saveUser(response.data);
      }
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleChangeEmail = async (email: string) => {
    try {
      const companyUsersApi = getApi(Companyusers);
      const response = await companyUsersApi.emailChangeCreate({
        email,
      }, {
        headers: {
          "X-User-Type": "company"
        }
      });

      if (response) {
        saveUser(response.data);
      }
    }
    catch (error: any) {
      console.error("Change email error:", error);
      throw error;
    }
  };

  const handleConfirmEmail = async (token: string) => {
    try {
      const companyUsersApi = getApi(Companyusers);
      const response = await companyUsersApi.emailConfirmCreate({
        token,
      }, {
        headers: {
          "X-User-Type": "company"
        }
      });

      if (response) {
        saveUser(response.data);
      }
    } catch (error) {
      console.error("Confirm email error:", error);
      throw error;
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    try {
      const authApi = getApi(Auth);
      const response = await authApi.changePasswordCreate({ new_password: newPassword }, {
        headers: {
          "X-User-Type": "company"
        }
      });

      if (response) {
        saveUser(response.data.user);
      }
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  };

  const handleDeleteAccount = async (password: string) => {
    try {
      // 現在のパスワードでログインできるか確認
      const authApi = getApi(Auth);
      const { data } = await authApi.loginCreate({
        email: user?.email || "",
        password,
      });
      if (!data.user) {
        throw new Error("現在のパスワードが間違っています");
      }

      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }
      const companyUsersApi = getApi(Companyusers);
      await companyUsersApi.companyusersDelete(userId, {
        headers: {
          "X-User-Type": "company"
        }
      });
      handleLogout();
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  };

  return (
    <CompanyAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        update: handleUpdate,
        changeEmail: handleChangeEmail,
        confirmEmail: handleConfirmEmail,
        changePassword: handleChangePassword,
        deleteAccount: handleDeleteAccount,
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
