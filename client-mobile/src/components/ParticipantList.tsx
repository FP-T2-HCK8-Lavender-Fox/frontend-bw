import { View, Text, XStack } from "tamagui";
import React from "react";
import { TouchableOpacity } from "react-native";
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
      marginHorizontal={40}
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
            {participants.name.charAt(0)}
          </Text>
        </XStack>
        <Text
          // @ts-ignore
          fontFamily="Coolvetica"
          fontWeight="600"
          fontSize={20}
          textAlign="center"
        >
          {participants.name}
        </Text>
      </XStack>
      {friendShip === false && (
        <TouchableOpacity
          onPress={() => {
            dispatch(postFriendship(participants.id));
            setFriendShip(true);
          }}
        >
          <Ionicons
            size={20}
            name={"person-add"}
            color={"#000080"}
            onPress={() => {
              dispatch(postFriendship(participants.id));
              setFriendShip(true);
            }}
          />
        </TouchableOpacity>
      )}
    </XStack>
  );
}
