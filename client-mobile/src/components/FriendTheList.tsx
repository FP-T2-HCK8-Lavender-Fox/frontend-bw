import { XStack, Text } from "tamagui";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function FriendTheList({ friends }: any) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("Chat", { friends });
      }}
    >
      <XStack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={20}
        paddingVertical={10}
        borderBottomWidth={1}
        borderColor="#ccc"
        marginBottom={10}
        backgroundColor="white"
        borderRadius={10}
        shadowColor="#000"
        shadowOffset={{
          width: 0,
          height: 2,
        }}
        shadowOpacity={0.2}
        shadowRadius={4}
        elevation={5}
      >
        <XStack flexDirection="row" alignItems="center">
          <XStack
            backgroundColor="#87ceeb"
            width={40}
            height={40}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            marginRight={10}
          >
            <Text
              // @ts-ignore
              fontFamily="Coolvetica"
              fontWeight="600"
              fontSize={16}
              color="white"
            >
              {friends.name.charAt(0)}
            </Text>
          </XStack>
          <Text
            // @ts-ignore
            fontFamily="Coolvetica"
            fontWeight="600"
            fontSize={20}
            textAlign="center"
          >
            {friends.name}
          </Text>
        </XStack>
        <Ionicons size={30} name={"chatbubbles"} color={"#87ceeb"} />
      </XStack>
    </TouchableOpacity>
  );
}
