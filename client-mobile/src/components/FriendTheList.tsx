import { XStack, Text } from "tamagui";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function FriendTheList({ friends }: any) {
  const navigation = useNavigation();
  return (
    <XStack
      paddingHorizontal={60}
      alignItems="center"
      justifyContent="space-between"
      paddingVertical={10}
      borderBottomWidth={1}
    >
      <Text
        // @ts-ignore
        fontFamily={"Coolvetica"}
        fontWeight={"600"}
        fontSize={20}
        textAlign="center"
        marginRight={20}
      >
        {friends.name}
      </Text>
      <Ionicons
        onPress={() => {
          // @ts-ignore
          navigation.navigate("Chat", { friends });
        }}
        size={30}
        name={"chatbubbles"}
        color={"#87ceeb"}
      />
    </XStack>
  );
}
