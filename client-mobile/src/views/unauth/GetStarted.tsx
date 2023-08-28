import React from "react";
import { ImageBackground } from "react-native";
import { Button, Text } from "tamagui";
import { useNavigation } from "@react-navigation/native";

export default function GetStarted() {
  const navigation = useNavigation();

  const toLogin = () => {
    // @ts-ignore
    navigation.navigate("LoginPage");
  };

  return (
    <ImageBackground
      style={{ flex: 1, flexDirection: "column-reverse" }}
      resizeMode="cover"
      source={require("../../../assets/getstarted/getstarted.png")}
    >
      <Button
        onPress={toLogin}
        backgroundColor={"$orange10Dark"}
        marginHorizontal={10}
        marginBottom={10}
        size="$6"
      >
        <Text
          // @ts-ignore
          fontFamily={"Coolvetica"}
          fontSize={20}
          color={"white"}
        >
          GET STARTED
        </Text>
      </Button>
      <Text
        textAlign={"center"}
        marginHorizontal={50}
        marginBottom={20}
        color={"white"}
        fontSize={16}
      >
        Join the challenge, survive, get the podium and win the prize.
      </Text>
      <Text
        textAlign={"center"}
        marginHorizontal={10}
        // @ts-ignore
        fontFamily={"InterBold"}
        color={"white"}
        fontSize={18}
      >
        Join The Game and Win The Prize
      </Text>
    </ImageBackground>
  );
}
