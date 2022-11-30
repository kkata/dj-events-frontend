import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { createCtx } from "./utils";

type User = {
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  error: string | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  checkUserLoggedIn: (user: User) => Promise<void>;
};

export const [useAuthCtx, AuthCtxProvider] = createCtx<AuthContextType>();

export const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user
  const register = async (user: User) => {
    console.log("register", user);
  };

  // Login user
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const identifier = email;
    console.log("login", { identifier, password });
  };

  // Logout user
  const logout = async () => {
    console.log("logout");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user: User) => {
    console.log("checkUserLoggedIn");
  };

  return (
    <AuthCtxProvider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {props.children}
    </AuthCtxProvider>
  );
};
