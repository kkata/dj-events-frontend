import { useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";
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
  // Optimizing re-renders with useCallback and useMemo
  // ref. https://beta.reactjs.org/apis/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const identifier = email;

      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setUser(data.user);
      } else {
        setError(data.message);
        // setError(null);
      }
    },
    []
  );

  // Logout user
  const logout = async () => {
    console.log("logout");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user: User) => {
    console.log("checkUserLoggedIn");
  };

  const contextValue = useMemo(
    () => ({
      user,
      error,
      login,
      register,
      logout,
      checkUserLoggedIn,
    }),
    [user, error, login]
  );

  return (
    <AuthCtxProvider value={contextValue}>{props.children}</AuthCtxProvider>
  );
};
