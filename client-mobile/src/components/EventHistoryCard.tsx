import { XStack, Text } from "tamagui";
import React from "react";

export default function EventHistoryCard({ event }: any) {
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
        <Text
          // @ts-ignore
          fontFamily="Coolvetica"
          fontWeight="600"
          fontSize={20}
          textAlign="center"
        >
          {event.name}
        </Text>
      </XStack>
    </XStack>
  );
}
