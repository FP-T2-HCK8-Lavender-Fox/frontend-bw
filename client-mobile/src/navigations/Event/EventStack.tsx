import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import React from "react";
import MyEvents from "../../views/auth/EventStacks/MyEvents";

const Stack = createNativeStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyEvents"
        component={MyEvents}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
