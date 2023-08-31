import { ScrollView, Text, View } from "tamagui";
import React from "react";
import { FlatList } from "react-native";
import HeaderComponent from "../../../components/HeaderComponent";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import {
  getFriendListOfUser,
  getFriendToAcceptList,
} from "../../../stores/reducers/eventReducer";
import IsLoading from "../../../components/IsLoading";
import { useNavigation } from "@react-navigation/native";
import FriendTheList from "../../../components/FriendTheList";

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
    dispatch(getFriendListOfUser()).then(() =>
      dispatch(getFriendToAcceptList())
    );
  }, [dispatch, route]);

  if (loading) {
    return <IsLoading />;
  }
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <HeaderComponent />
          <View marginTop={30} paddingHorizontal={40}>
            <Text
              // @ts-ignore
              fontFamily={"Coolvetica"}
              fontSize={30}
              fontWeight={"600"}
              marginBottom={10}
              textAlign="center"
            >
              Home
            </Text>
            {userToAccept?.length > 0 && (
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
          </View>
        </>
      }
      data={allUserFriends}
      renderItem={({ item }) => <FriendTheList friends={item} />}
      keyExtractor={({ id }) => id}
    />
  );
}
