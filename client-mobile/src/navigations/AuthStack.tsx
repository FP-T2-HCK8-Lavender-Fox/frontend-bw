import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../views/unauth/GetStarted";
import LoginPage from "../views/unauth/LoginPage";
import React from "react";
import MainTabs from "./MainTabs";
import RegisterPage from "../views/unauth/RegisterPage";
import { useAuth } from "../context/AuthContext";
import { Button } from "tamagui";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerRight: () => <Button onPress={onLogout}>Logout</Button>,
          }}
        />
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
