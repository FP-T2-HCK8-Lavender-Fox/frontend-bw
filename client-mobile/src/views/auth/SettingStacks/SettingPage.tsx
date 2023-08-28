import { Button, Text, View } from "tamagui";
import React from "react";
//@ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../../context/AuthContext";

export default function SettingPage() {
  const { onLogout } = useAuth();

  return (
    <View flex={1} alignItems="center" padding={20}>
      <FontAwesome
        style={{ marginTop: 50 }}
        name={"user-circle"}
        size={120}
        color={"#E35335"}
      />
      <Button
        width={200}
        marginTop={40}
        borderWidth={1}
        borderColor={"beige"}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        backgroundColor={"#FFBF00"}
      >
        <Text fontWeight={"800"}>Edit Profile</Text>
      </Button>
      <Button
        onPress={onLogout}
        width={200}
        marginTop={0}
        borderWidth={1}
        borderColor={"beige"}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        backgroundColor={"#FFBF00"}
      >
        <Text fontWeight={"800"}>Logout</Text>
      </Button>
    </View>
  );
}
