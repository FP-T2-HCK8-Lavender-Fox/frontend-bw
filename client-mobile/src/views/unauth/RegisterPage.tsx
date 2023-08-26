import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Dropdown from "react-native-input-select";
import { ScrollView, View, Text, Image, Button } from "tamagui";

export default function RegisterPage() {
  const navigation = useNavigation();

  const [data, setNewData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const goToLogin = () => {
    // @ts-ignore
    navigation.pop();
  };

  return (
    <ScrollView flex={1}>
      <View width="100%" alignItems="center">
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
          Register
        </Text>
        <View gap={10} width={"60%"}>
          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Dropdown
            placeholder="Gender"
            options={[{ name: "Male" }, { name: "Female" }]}
            optionLabel={"name"}
            optionValue={"name"}
            primaryColor={"orange"}
            dropdownStyle={{
              borderWidth: 1, // To remove border, set borderWidth to 0
            }}
            placeholderStyle={{
              color: "black",
              fontSize: 15,
            }}
            labelStyle={{ color: "black", fontSize: 15, fontWeight: "500" }}
            onValueChange={() => {
              console.log("slebew");
            }}
            checkboxComponent={<View style={styles.radioButton} />}
            checkboxComponentStyles={{
              checkboxSize: 10,
              checkboxStyle: {
                backgroundColor: "black",
                borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
                borderColor: "blue",
                borderWidth: 3,
              },
              checkboxLabelStyle: { fontSize: 20 },
            }}
            dropdownIconStyle={{ top: 30, right: 20 }}
            listHeaderComponent={
              <View style={styles.customComponentContainer}>
                <Text style={styles.text}>Select Gender</Text>
              </View>
            }
            modalOptionsContainerStyle={{
              padding: 10,
              backgroundColor: "white",
            }}
          />
          <Button
            marginVertical={10}
            size={"$4"}
            backgroundColor={"$orange10Dark"}
          >
            <Text
              color={"white"}
              // @ts-ignore
              fontFamily={"InterBold"}
            >
              Register
            </Text>
          </Button>
          <Text
            onPress={goToLogin}
            textDecorationLine="underline"
            textAlign="center"
            color={"$blue10Dark"}
          >
            Already have account? Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "50%",
    resizeMode: "contain",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#FFF",
  },
  customComponentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    marginBottom: 20,
    textAlign: "center",
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: "white",
  },
});
