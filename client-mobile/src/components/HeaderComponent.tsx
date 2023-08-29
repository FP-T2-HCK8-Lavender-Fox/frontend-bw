import { XStack, Image, Text } from "tamagui";
import React from "react";

export default function HeaderComponent() {
  return (
    <XStack
      paddingHorizontal={10}
      paddingVertical={10}
      backgroundColor={"#FFBF00"}
      justifyContent={"space-between"}
      alignItems={"center"}
      elevation={7}
    >
      <Image
        source={require("../../assets/logo/logo1.png")}
        style={{
          width: 60,
          height: 60,
        }}
      />
      <Text
        // @ts-ignore
        fontFamily={"Coolvetica"}
        fontSize={30}
        fontWeight={"bold"}
        color={"#E35335"}
        marginRight={40}
      >
        FAF
      </Text>
    </XStack>
  );
}
