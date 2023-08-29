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
      justifyContent="space-between"
      paddingVertical={10}
      paddingHorizontal={20}
      borderBottomWidth={1}
      alignItems="center"
    >
      <Text
        // @ts-ignore
        fontFamily={"Coolvetica"}
        fontWeight={"600"}
        fontSize={20}
        textAlign="center"
        marginRight={20}
      >
        {friendrequest.name}
      </Text>
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
