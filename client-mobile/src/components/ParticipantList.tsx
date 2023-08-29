import { View, Text, XStack } from "tamagui";
import React from "react";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { postFriendship } from "../stores/reducers/eventReducer";

export default function ParticipantList({
  participants,
  dispatch,
}: {
  participants: any;
  dispatch: (action: any) => void;
}) {
  const [friendShip, setFriendShip] = React.useState(true);

  React.useEffect(() => {
    setFriendShip(participants.isFriend);
  }, []);
  return (
    <XStack
      paddingHorizontal={60}
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
        {participants.name}
      </Text>
      {friendShip === false && (
        <Ionicons
          size={20}
          name={"person-add"}
          color={"#000080"}
          onPress={() => {
            dispatch(postFriendship(participants.id));
            setFriendShip(true);
          }}
        />
      )}
    </XStack>
  );
}
