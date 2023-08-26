import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { View, Text, Image, Button } from "tamagui";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigation = useNavigation();

  const { onLogin } = useAuth();

  const [data, setNewData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const login = async () => {
    const result = await onLogin!(data.email, data.password);
    if (result && result.error) {
      return console.log(result.msg);
    }
  };

  const goToRegister = () => {
    // @ts-ignore
    navigation.navigate("RegisterPage");
  };

  return (
    <View alignItems="center" width={"100%"}>
      <Image
        source={require("../../../assets/logo/logo1.png")}
        style={styles.image}
      />
      <Text
        marginVertical={10}
        fontSize={17}
        // @ts-ignore
        fontFamily={"InterBold"}
      >
        Login
      </Text>
      <View gap={10} width={"60%"}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setNewData({ ...data, email: text })}
          value={data.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text: string) =>
            setNewData({ ...data, password: text })
          }
          value={data.password}
        />
        <Button
          marginVertical={10}
          size={"$4"}
          backgroundColor={"$orange10Dark"}
          onPress={login}
        >
          <Text
            color={"white"}
            // @ts-ignore
            fontFamily={"InterBold"}
          >
            Sign In
          </Text>
        </Button>
        <Text
          onPress={goToRegister}
          textDecorationLine="underline"
          textAlign="center"
          color={"$blue10Dark"}
        >
          Not Yet Have an Account? Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#FFF",
  },
});
