import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (email: string, password: string) => Promise<any>;
  onRegister?: (
    email: string,
    name: string,
    password: string,
    gender: string
  ) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("ACCESS_TOKEN");

      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });

        api.defaults.headers.common["access_token"] = `${token}`;
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post(
        "/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuthState({
        token: data.access_token,
        authenticated: true,
      });

      api.defaults.headers.common["access_token"] = `${data.access_token}`;

      await SecureStore.setItemAsync("ACCESS_TOKEN", data.access_token);

      return data;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    gender: string
  ) => {
    try {
      const { data } = await api.post(
        "/users/register",
        {
          email,
          name,
          password,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("ACCESS_TOKEN");

    api.defaults.headers.common["access_token"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
