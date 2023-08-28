import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import React from "react";
import HomePage from "../../views/auth/HomeStacks/HomePage";
import DetailPage from "../../views/auth/HomeStacks/DetailPage";
import GatewayView from "../../components/GatewayView";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailHomePage"
        component={DetailPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GatewayView"
        component={GatewayView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
