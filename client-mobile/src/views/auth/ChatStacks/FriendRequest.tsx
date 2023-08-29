import { View, Text, XStack } from "tamagui";
import { FlatList } from "react-native";
import React from "react";
import { useAppDispatch } from "../../../stores/store";
import FriendRequestList from "../../../components/FriendRequestList";

export default function FriendRequest({ navigation, route }: any) {
  const { userToAccept } = route?.params;
  const dispatch = useAppDispatch();

  if (userToAccept.length === 0 || !userToAccept || !route.params) {
    return (
      <View flex={1} paddingHorizontal={20}>
        <Text textAlign="center" top="50%">
          You don't have any friend request
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      ListHeaderComponent={
        <XStack
          height={180}
          justifyContent="center"
          alignItems="center"
          backgroundColor={"#FFBF00"}
          elevation={30}
          marginBottom={40}
        >
          <Text fontWeight={"700"} fontSize={26}>
            Request List
          </Text>
        </XStack>
      }
      data={userToAccept}
      renderItem={({ item }) => (
        <FriendRequestList
          navigation={navigation}
          friendrequest={item}
          dispatch={dispatch}
        />
      )}
    />
  );
}
