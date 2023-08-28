import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import React from "react";
import SettingPage from "../../views/auth/SettingStacks/SettingPage";

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
