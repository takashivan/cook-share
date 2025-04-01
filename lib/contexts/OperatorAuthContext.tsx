"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { operatorApi } from "../api/operator";

interface Operator {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

interface OperatorAuthContextType {
  operator: Operator | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const OperatorAuthContext = createContext<OperatorAuthContextType | undefined>(
  undefined
);

export function OperatorAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("operator_token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await operatorApi.getCurrentOperator();
      if (response) {
        setOperator(response);
      } else {
        throw new Error("認証に失敗しました");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("operator_token");
      setOperator(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await operatorApi.login({ email, password });
      localStorage.setItem("operator_token", response.authToken);
      setOperator(response.user);
      router.push("/operator/dashboard");
    } catch (error) {
      setError("ログインに失敗しました");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("operator_token");
      setOperator(null);
      router.push("/operator/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <OperatorAuthContext.Provider
      value={{ operator, loading, error, login, logout }}>
      {children}
    </OperatorAuthContext.Provider>
  );
}

export function useOperatorAuth() {
  const context = useContext(OperatorAuthContext);
  if (context === undefined) {
    throw new Error(
      "useOperatorAuth must be used within an OperatorAuthProvider"
    );
  }
  return context;
}
