import { Text, XStack, Button } from "tamagui";
import React from "react";
import {
  acceptFriendRequest,
  getFriendListOfUser,
  getFriendToAcceptList,
} from "../stores/reducers/eventReducer";

export default function FriendRequestList({
  navigation,
  dispatch,
  friendrequest,
}: {
  navigation: any;
  dispatch: (action: any) => Promise<any>;
  friendrequest: any;
}) {
  return (
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
            {friendrequest.name.charAt(0)}
          </Text>
        </XStack>
        <Text
          // @ts-ignore
          fontFamily="Coolvetica"
          fontWeight="600"
          fontSize={20}
          textAlign="center"
        >
          {friendrequest.name}
        </Text>
      </XStack>
      <Button
        onPress={() => {
          dispatch(acceptFriendRequest(friendrequest.id))
            .then(() => dispatch(getFriendToAcceptList()))
            .then(() => dispatch(getFriendListOfUser()))
            .then(() => navigation.navigate("FriendList"));
        }}
        marginHorizontal={2}
        color={"white"}
        backgroundColor={"#87ceeb"}
      >
        Accept
      </Button>
      <Button
        color={"white"}
        marginHorizontal={2}
        backgroundColor={"$red7Dark"}
      >
        Ignore
      </Button>
    </XStack>
  );
}
