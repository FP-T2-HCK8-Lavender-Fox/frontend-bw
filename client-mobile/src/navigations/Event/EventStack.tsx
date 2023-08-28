import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import React from "react";
import MyEvents from "../../views/auth/EventStacks/MyEvents";
import DetailMyEvent from "../../views/auth/EventStacks/DetailMyEvent";
import OtherParticipants from "../../views/auth/EventStacks/OtherParticipants";
import CameraQuestion from "../../views/auth/EventStacks/CameraQuestion";

const Stack = createNativeStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyEvents"
        component={MyEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailMyEvent"
        component={DetailMyEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtherParticipants"
        component={OtherParticipants}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraForQuiz"
        component={CameraQuestion}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
