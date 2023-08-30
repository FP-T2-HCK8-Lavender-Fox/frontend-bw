import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import React from "react";
import FriendList from "../../views/auth/ChatStacks/FriendList";
import FriendRequest from "../../views/auth/ChatStacks/FriendRequest";
import AllFriendList from "../../views/auth/ChatStacks/AllFriendList";
import Chat from "../../views/auth/ChatStacks/Chat";

const Stack = createNativeStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendList"
        component={FriendList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FriendRequest"
        component={FriendRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllFriendList"
        component={AllFriendList}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
