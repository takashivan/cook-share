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
  clearCurrentUser,
} from "@/lib/api/config";
import { getApi } from "@/api/api-factory";
import { Users } from "@/api/__generated__/base/Users";
import { Auth } from "@/api/__generated__/authentication/Auth";
import { ProfilePartialUpdatePayload, UsersPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";
import { User } from "@/api/__generated__/base/User";
import { LoginCreateData, SignupCreatePayload } from "@/api/__generated__/authentication/data-contracts";
import { useSWRConfig } from "swr";

export interface AuthContextType {
  user: LoginCreateData["user"] | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: SignupCreatePayload) => Promise<void>;
  createProfile: (data: ProfilePartialUpdatePayload) => Promise<{
    status: "success" | "error";
    error?: string;
  }>;
  update: (data: Partial<UsersPartialUpdatePayload>) => Promise<void>;
  changeEmail: (email: string) => Promise<void>;
  confirmEmail: (token: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  setUser: (user: LoginCreateData["user"] | null) => void;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  createProfile: async () => ({ status: "error" as const, error: "Not implemented" }),
  update: async () => {},
  changeEmail: async () => {},
  confirmEmail: async () => {},
  changePassword: async () => {},
  deleteAccount: async () => {},
  setUser: () => {},
  reloadUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginCreateData["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { mutate } = useSWRConfig()

  const saveUser = (userData: LoginCreateData["user"] | null) => {
    setUser(userData);
    setCurrentUser(userData, "chef");
  };

  const reloadUser = async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      const userApi = getApi(Users);
      const userData = await userApi.usersDetail(userId, {
        headers: {
          "X-User-Type": "chef",
        }
      });
      if (!userData) {
        throw new Error("User not found");
      }

      saveUser(userData.data);
    } catch (error) {
      console.error("Error reloading user:", error);
      setUser(null);
      setCurrentUser(null, "chef");
    }
  };

  const setAuth = (token: string, userData: LoginCreateData["user"]) => {
    setAuthToken(token, "chef");
    saveUser(userData);
    setIsAuthenticated(true);
  };

  const initAuth = async () => {
    try {
      const token = getAuthToken();
      if (token) {
        const userData = await getCurrentUser();
        if (userData) {
          // stripeから戻ってきた時などに最新の情報を取得する
          const userApi = getApi(Users);
          const user = await userApi.usersDetail(userData.id, {
            headers: {
              "X-User-Type": "chef",
            }
          });
          saveUser(user.data);
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
      const authApi = getApi(Auth);
      const { data } = await authApi.loginCreate({
        email,
        password,
      });
      setAuth(data.sessionToken, data.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    clearAuthToken("chef");
    clearCurrentUser("chef");
    setUser(null);
    setIsAuthenticated(false);
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

  /**
   * ユーザー登録直後の、プロフィールの更新を行う関数
   */
  const handleCreateProfile = async (data: ProfilePartialUpdatePayload): Promise<{ status: "success" | "error"; error?: string }> => {
    try {
      const userId = user?.id;
      if (!userId) {
        return {
          status: "error",
          error: "ユーザー情報が見つかりません",
        };
      }

      const userApi = getApi(User);
      const response = await userApi.profilePartialUpdate(userId, data, {
        headers: {
          "X-User-Type": "chef"
        }
      });

      // stripeのエラーがある場合、エラーの内容を返す
      if ((response.data as any).data?.error != null) {
        return {
          status: "error",
          error: String((response.data as any).data.error.message || "不明なエラーが発生しました"),
        };
      }

      saveUser(response.data as unknown as LoginCreateData["user"]);
      return {
        status: "success",
      };
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  /**
   * ユーザープロフィールの更新を行う関数
   */
  const handleUpdate = async (data: Partial<UsersPartialUpdatePayload>) => {
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      const usersApi = getApi(Users);
      const response = await usersApi.usersPartialUpdate(userId, data as UsersPartialUpdatePayload, {
        headers: {
          "X-User-Type": "chef"
        }
      });

      if (response) {
        saveUser(response.data.result1 as unknown as LoginCreateData["user"]);
      }
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleChangeEmail = async (email: string) => {
    try {
      const usersApi = getApi(Users);
      const response = await usersApi.emailChangeCreate({
        email,
      }, {
        headers: {
          "X-User-Type": "chef"
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
      const usersApi = getApi(Users);
      const response = await usersApi.emailConfirmCreate({
        token,
      }, {
        headers: {
          "X-User-Type": "chef"
        }
      });

      if (response) {
        saveUser(response.data);
      }
    }
    catch (error) {
      console.error("Confirm email error:", error);
      throw error;
    }
  }

  const handleChangePassword = async (newPassword: string) => {
    try {
      const authApi = getApi(Auth);
      const response = await authApi.changePasswordCreate({ new_password: newPassword }, {
        headers: {
          "X-User-Type": "chef"
        }
      });

      if (response) {
        saveUser(response.data.result1);
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
      const usersApi = getApi(Users);
      await usersApi.usersDelete(userId, {
        headers: {
          "X-User-Type": "chef"
        }
      });
      handleLogout();
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        update: handleUpdate,
        createProfile: handleCreateProfile,
        setUser: saveUser,
        changeEmail: handleChangeEmail,
        confirmEmail: handleConfirmEmail,
        changePassword: handleChangePassword,
        deleteAccount: handleDeleteAccount,
        reloadUser,
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
