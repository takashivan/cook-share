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
import type { UserData, UserProfile } from "@/lib/api/user";
import { login, logout, getUserProfile, register } from "@/lib/api/user";
import { getApi } from "@/api/api-factory";
import { Users } from "@/api/__generated__/base/Users";
import { Auth } from "@/api/__generated__/authentication/Auth";
import { UsersPartialUpdatePayload } from "@/api/__generated__/base/data-contracts";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: UserData) => Promise<void>;
  update: (data: Partial<UsersPartialUpdatePayload>) => Promise<void>;
  changeEmail: (email: string, currentEmail: string, password: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  setUser: (user: UserProfile | null) => void;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  update: async () => {},
  changeEmail: async () => {},
  changePassword: async () => {},
  deleteAccount: async () => {},
  setUser: () => {},
  reloadUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const saveUser = (userData: UserProfile | null) => {
    setUser(userData);
    setCurrentUser(userData, "chef");
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
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

      saveUser(userData.data as unknown as UserProfile);
    } catch (error) {
      console.error("Error reloading user:", error);
      setUser(null);
      setCurrentUser(null, "chef");
    }
  };

  const setAuth = (token: string, userData: UserProfile) => {
    setAuthToken(token, "chef");
    saveUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { sessionToken, user } = await login({
        email,
        password,
      });
      setAuth(sessionToken, user);
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
  };

  const handleRegister = async (data: UserData) => {
    try {
      const response = await register(data);
      setAuth(response.sessionToken, response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

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
        saveUser(response.data as unknown as UserProfile);
      }
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleChangeEmail = async (email: string, currentEmail: string, password: string) => {
    try {
      // 現在のメアドとPWでログインできるか確認
      const { sessionToken, user: currentUser } = await login({
        email: currentEmail,
        password,
      });

      const userId = currentUser?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      setAuth(sessionToken, currentUser);

      const authApi = getApi(Auth);
      const response = await authApi.updateEmailCreate({
        email,
        user_id: userId,
      }, {
        headers: {
          "X-User-Type": "chef"
        }
      });

      if (response) {
        saveUser(response.data as unknown as UserProfile);
      }
    }
    catch (error: any) {
      if (error?.response?.status === 401) {
        // 認証エラー（ログイン失敗）
        throw new Error("現在のメールアドレスまたはパスワードが間違っています");
      }

      console.error("Change email error:", error);
      throw error;
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // 現在のパスワードでログインできるか確認
      const { sessionToken, user: currentUser } = await login({
        email: user?.email || "",
        password: currentPassword,
      });
      if (!currentUser) {
        throw new Error("現在のパスワードが間違っています");
      }

      setAuth(sessionToken, currentUser);

      const userId = currentUser?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      const authApi = getApi(Auth);
      const response = await authApi.changePasswordCreate({ new_password: newPassword }, {
        headers: {
          "X-User-Type": "chef"
        }
      });

      if (response) {
        saveUser(response.data as unknown as UserProfile);
      }
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  };

  const handleDeleteAccount = async (password: string) => {
    try {
      // 現在のパスワードでログインできるか確認
      const { user: currentUser } = await login({
        email: user?.email || "",
        password,
      });
      if (!currentUser) {
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
        register: handleRegister,
        update: handleUpdate,
        setUser: saveUser,
        changeEmail: handleChangeEmail,
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
