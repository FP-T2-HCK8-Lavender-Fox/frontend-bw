import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View } from "tamagui";
import EventStack from "./Event/EventStack";
import ChatStack from "./Chat/ChatStack";
import HomeStack from "./Home/HomeStack";
import SettingStack from "./Settings/SettingStack";
import { useAppDispatch } from "../stores/store";
import {
  getEvents,
  getEventsOfUsers,
  getFriendListOfUser,
  getFriendToAcceptList,
} from "../stores/reducers/eventReducer";
import { getSelf } from "../stores/reducers/categoryReducer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const dispatch = useAppDispatch();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, color }) => {
          let labelName;
          if (route.name === "HomeStack") {
            labelName = "Home";
          } else if (route.name === "EventStack") {
            labelName = "My Event";
          } else if (route.name === "ChatStack") {
            labelName = "Chat";
          } else if (route.name === "SettingStack") {
            labelName = "Settings";
          }

          return <Text color={color}>{labelName}</Text>;
        },
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
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: "#FFBF00",
          borderRadius: 15,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (routeName === "DetailHomePage" || routeName === "GatewayView") {
              return { display: "none" };
            }
            return {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 5,
              backgroundColor: "#FFBF00",
              borderRadius: 15,
              height: 60,
            };
          })(route),
          headerShown: false,
        })}
        listeners={{
          tabPress: (e) => {
            dispatch(getEvents());
          },
        }}
      />
      <Tab.Screen
        name="EventStack"
        component={EventStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (
              routeName === "DetailMyEvent" ||
              routeName === "OtherParticipants" ||
              routeName === "CameraForQuiz" ||
              routeName === "QuizSection" ||
              routeName === "HistoryUserEvents"
            ) {
              return { display: "none" };
            }
            return {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 5,
              backgroundColor: "#FFBF00",
              borderRadius: 15,
              height: 60,
            };
          })(route),
          headerShown: false,
        })}
        listeners={{
          tabPress: (e) => {
            dispatch(getEventsOfUsers());
          },
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (routeName === "FriendRequest" || routeName === "Chat") {
              return { display: "none" };
            }
            return {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 5,
              backgroundColor: "#FFBF00",
              borderRadius: 15,
              height: 60,
            };
          })(route),
          headerShown: false,
        })}
        listeners={{
          tabPress: (e) => {
            dispatch(getFriendListOfUser());
            dispatch(getFriendToAcceptList());
          },
        }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";

            if (routeName === "EditProfile") {
              return { display: "none" };
            }
            return {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 5,
              backgroundColor: "#FFBF00",
              borderRadius: 15,
              height: 60,
            };
          })(route),
          headerShown: false,
        })}
        listeners={{
          tabPress: (e) => {
            dispatch(getSelf());
          },
        }}
      />
    </Tab.Navigator>
  );
}
