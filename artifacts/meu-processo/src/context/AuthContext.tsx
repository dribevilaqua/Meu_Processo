import React, { createContext, useContext, useState, useEffect } from "react";
import { User, mockUsers } from "@/lib/mockData";

interface AuthContextType {
  user: User | null;
  login: (perfil: "ADVOGADO" | "CLIENTE") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("meu-processo-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (perfil: "ADVOGADO" | "CLIENTE") => {
    const selectedUser = mockUsers.find((u) => u.perfil === perfil);
    if (selectedUser) {
      setUser(selectedUser);
      localStorage.setItem("meu-processo-user", JSON.stringify(selectedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("meu-processo-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
