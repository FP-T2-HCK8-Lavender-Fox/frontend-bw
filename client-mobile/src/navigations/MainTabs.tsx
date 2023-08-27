import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "tamagui";
import EventStack from "./Event/EventStack";
import ChatStack from "./Chat/ChatStack";
import HomeStack from "./Home/HomeStack";
import SettingStack from "./Settings/SettingStack";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "EventStack") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "ChatStack") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "SettingStack") {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return (
            <View alignItems="center" justifyContent="center">
              <Ionicons name={iconName} size={30} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: "#E35335",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: "#FFBF00",
          borderRadius: 15,
          height: 90,
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="EventStack"
        component={EventStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
