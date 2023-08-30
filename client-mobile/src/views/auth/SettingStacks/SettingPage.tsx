import { Button, Text, View } from "tamagui";
import React from "react";
//@ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../../context/AuthContext";
import HeaderComponent from "../../../components/HeaderComponent";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import IsLoading from "../../../components/IsLoading";
import { getSelf } from "../../../stores/reducers/categoryReducer";

export default function SettingPage({ route }: any) {
  const { onLogout } = useAuth();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const myself = useSelector((state: RootState) => state.categories.userSelf);
  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );

  React.useEffect(() => {
    dispatch(getSelf());
  }, [dispatch, route]);

  const goToEditProfile = () => {
    //@ts-ignore
    navigation.navigate("EditProfile", {
      self: myself,
    });
  };

  if (loading) return <IsLoading />;
  return (
    <>
      <HeaderComponent />
      <View alignItems="center" padding={20}>
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
          onPress={goToEditProfile}
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
    </>
  );
}
