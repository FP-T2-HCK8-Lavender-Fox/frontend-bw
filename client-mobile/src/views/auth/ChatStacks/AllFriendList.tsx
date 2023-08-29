import { View, Text, XStack } from "tamagui";
import { FlatList } from "react-native";
import React from "react";
import FriendTheList from "../../../components/FriendTheList";

export default function AllFriendList({ route }: any) {
  const { friendList } = route.params;

  if (friendList.length === 0) {
    return (
      <View flex={1} paddingHorizontal={20}>
        <Text textAlign="center" top="50%">
          You don't have any friends. Let's add some!
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
            Friend List
          </Text>
        </XStack>
      }
      data={friendList}
      renderItem={({ item }) => <FriendTheList friends={item} />}
      keyExtractor={({ id }) => id}
    />
  );
}
