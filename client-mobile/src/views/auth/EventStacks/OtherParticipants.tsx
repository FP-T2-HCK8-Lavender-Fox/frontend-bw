import { View, Text, XStack } from "tamagui";
import { FlatList } from "react-native";
import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import {
  getFriendList,
  getParticipants,
} from "../../../stores/reducers/eventReducer";
import { Users } from "../../../models/users";
import { useSelector } from "react-redux";
import IsLoading from "../../../components/IsLoading";
import ParticipantList from "../../../components/ParticipantList";
import { getSelf } from "../../../stores/reducers/categoryReducer";

export default function OtherParticipants({ route }: any) {
  const { id } = route.params;
  const dispatch = useAppDispatch();

  const [loadingState, setLoadingState] = React.useState(true);

  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );
  const friendList: Users[] = useSelector(
    (state: RootState) => state.events.events.friendList
  );
  const userParticipants: Users[] = useSelector(
    (state: RootState) => state.events.events.eventParticipants
  );
  const myself: Users = useSelector(
    (state: RootState) => state.categories.userSelf
  );
  const friendParticipant = [];
  for (const participant of userParticipants) {
    if (friendList.length === 0) {
      if (participant.id === myself.id) {
        friendParticipant.push({ ...participant, isFriend: true });
      } else {
        friendParticipant.push({ ...participant, isFriend: false });
      }
    } else {
      for (const friend of friendList) {
        if (participant.id === myself.id || participant.id === friend.id) {
          friendParticipant.push({ ...participant, isFriend: true });
        } else {
          friendParticipant.push({ ...participant, isFriend: false });
        }
      }
    }
  }

  let tmpFriend = [];
  tmpFriend = friendParticipant;

  React.useEffect(() => {
    dispatch(getParticipants(id));
    dispatch(getFriendList());
    dispatch(getSelf());
    setTimeout(() => setLoadingState(false), 1500);
  }, [route]);

  if (loading || !myself.name || loadingState) {
    return <IsLoading />;
  }
  if (userParticipants.length === 0) {
    return (
      <View>
        <Text>No Participant, how can you be here?</Text>
      </View>
    );
  }
  return (
    <FlatList
      ListHeaderComponent={
        <XStack
          height={180}
          justifyContent="center"
          alignItems="center"
          backgroundColor={"#FFBF00"}
          elevation={30}
          marginBottom={40}
        >
          <Text fontWeight={"700"} fontSize={26}>
            Participant List
          </Text>
        </XStack>
      }
      data={tmpFriend}
      renderItem={({ item }) => (
        // @ts-ignore
        <ParticipantList dispatch={dispatch} participants={item} />
      )}
      //@ts-ignore
      keyExtractor={({ id }) => id}
    />
  );
}
