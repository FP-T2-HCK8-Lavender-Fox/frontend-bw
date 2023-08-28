import { ActivityIndicator } from "react-native";
import { View } from "tamagui";
import React from "react";

export default function IsLoading() {
  return (
    <View position="absolute" right={0} left={0} top="50%">
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}
