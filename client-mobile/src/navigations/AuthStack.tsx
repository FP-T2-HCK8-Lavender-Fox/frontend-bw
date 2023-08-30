import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../views/unauth/GetStarted";
import LoginPage from "../views/unauth/LoginPage";
import React from "react";
import MainTabs from "./MainTabs";
import RegisterPage from "../views/unauth/RegisterPage";
import { useAuth } from "../context/AuthContext";
import Chat from "../views/auth/ChatStacks/Chat";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const { authState } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
