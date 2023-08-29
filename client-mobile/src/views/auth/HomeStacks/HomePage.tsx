import { FlatList } from "react-native";
import React from "react";
import { EventsCard } from "../../../components/EventsCard";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getEvents } from "../../../stores/reducers/eventReducer";
import { useSelector } from "react-redux";
import IsLoading from "../../../components/IsLoading";
import HeaderComponent from "../../../components/HeaderComponent";
import { XStack, Text } from "tamagui";

export default function HomePage({ navigation, route }: any) {
  const dispatch = useAppDispatch();

  const eventList = useSelector(
    (state: RootState) => state.events.events.fullEvents
  );
  const eventLoading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );

  React.useEffect(() => {
    dispatch(getEvents());
  }, [dispatch, route]);

  if (eventLoading) {
    return <IsLoading />;
  }
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <HeaderComponent />
          <XStack>
            <Text>Home Page</Text>
          </XStack>
        </>
      }
      data={eventList}
      renderItem={({ item }) => (
        <EventsCard navigation={navigation} events={item} route={route} />
      )}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
}
