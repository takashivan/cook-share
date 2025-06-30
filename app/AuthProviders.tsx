"use client";

import { AuthProvider } from "@/lib/contexts/AuthContext";
import { CompanyAuthProvider } from "@/lib/contexts/CompanyAuthContext";

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CompanyAuthProvider>
        {children}
      </CompanyAuthProvider>
    </AuthProvider>
  );
}
