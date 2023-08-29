import { Button, ScrollView, Text, View } from "tamagui";
import React from "react";
import HeaderComponent from "../../../components/HeaderComponent";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import {
  getFriendListOfUser,
  getFriendToAcceptList,
} from "../../../stores/reducers/eventReducer";
import IsLoading from "../../../components/IsLoading";
import { useNavigation } from "@react-navigation/native";

export default function FriendList({ route }: any) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );
  const userToAccept = useSelector(
    (state: RootState) => state.events.events.userNeedAccept
  );
  const allUserFriends = useSelector(
    (state: RootState) => state.events.events.allUserFriendIs
  );

  React.useEffect(() => {
    dispatch(getFriendToAcceptList());
    dispatch(getFriendListOfUser());
  }, [dispatch, route]);

  if (loading) {
    return <IsLoading />;
  }
  return (
    <ScrollView flex={1}>
      <HeaderComponent />
      <View marginTop={30} paddingBottom={130} paddingHorizontal={40}>
        {userToAccept.length > 0 && (
          <Text
            fontWeight={"bold"}
            textDecorationLine="underline"
            color={"#E35335"}
            marginBottom={20}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("FriendRequest", {
                userToAccept: userToAccept,
              });
            }}
          >
            Friend Request
          </Text>
        )}
        <Button
          onPress={() => {
            // @ts-ignore
            navigation.navigate("AllFriendList", {
              friendList: allUserFriends,
            });
          }}
          marginVertical={10}
          backgroundColor={"#E35335"}
          color="white"
        >
          Friend List
        </Button>
        <Text
          textAlign="center"
          fontWeight={"bold"}
          fontSize={25}
          // @ts-ignore
          fontFamily={"Coolvetica"}
          paddingBottom={20}
          borderBottomWidth={2}
        >
          Recent Chats
        </Text>
      </View>
    </ScrollView>
  );
}
