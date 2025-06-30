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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export interface CompanyAuthContextType {
  user: LoginCreateData["user"] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginCreateData["user"]>;
  logout: () => Promise<void>;
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

  const router = useRouter();

  const { mutate, cache } = useSWRConfig()

  const unauthorizedErrorHandler = async () => {
    await handleLogout();
    router.push("/login/company");
    toast({
      title: "ログインが必要です",
      description: "再度ログインしてください。",
      variant: "destructive",
    });
  }

  useEffect(() => {
    const currentUser = getCurrentUser("company");
    if (currentUser) {
      console.log("Current user found:", currentUser);
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    console.log("CompanyAuthProvider mounted, user:", currentUser);
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
      unauthorizedErrorHandler();
    }
  };

  const setAuth = (token: string,  userData: LoginCreateData["user"]) => {
    console.log("Setting auth token and user data:", token, userData);
    setAuthToken(token, "company");
    saveUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      clearAuthToken("company");
      clearCurrentUser("company");
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return Promise.resolve();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
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
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.status === 401) {
        unauthorizedErrorHandler();
      } else {
        throw error;
      }
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
      if (error.status === 401) {
        unauthorizedErrorHandler();
      } else {
        throw error;
      }
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
    } catch (error: any) {
      console.error("Confirm email error:", error);
      if (error.status === 401) {
        unauthorizedErrorHandler();
      } else {
        throw error;
      }
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
    } catch (error: any) {
      console.error("Change password error:", error);
      if (error.status === 401) {
        unauthorizedErrorHandler();
      } else {
        throw error;
      }
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
    } catch (error: any) {
      console.error("Delete account error:", error);
      if (error.status === 401) {
        unauthorizedErrorHandler();
      } else {
        throw error;
      }
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
