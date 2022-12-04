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
  checkUserLoggedIn: () => Promise<void>;
};

export const [useAuthCtx, AuthCtxProvider] = createCtx<AuthContextType>();

export const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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

      if (res.ok) {
        setUser(data.user);
        router.push("/account/dashboard");
      } else {
        setError(data.message);
        // setError(null);
      }
    },
    [router]
  );

  // Logout user
  const logout = useCallback(async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  }, [router]);

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
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
    [user, error, login, logout]
  );

  return (
    <AuthCtxProvider value={contextValue}>{props.children}</AuthCtxProvider>
  );
};
