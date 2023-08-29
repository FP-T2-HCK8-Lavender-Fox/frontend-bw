import { View, Text } from "react-native";
import React from "react";

export default function OtherParticipants({ route }: any) {
  const { id } = route.params;

  console.log(id);
  return (
    <View>
      <Text>OtherParticipants</Text>
    </View>
  );
}
