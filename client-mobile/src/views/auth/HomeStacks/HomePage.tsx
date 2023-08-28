import { FlatList } from "react-native";
import React from "react";
import { EventsCard } from "../../../components/EventsCard";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getEvents } from "../../../stores/reducers/eventReducer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import IsLoading from "../../../components/IsLoading";

export default function HomePage() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const eventList = useSelector(
    (state: RootState) => state.events.events.fullEvents
  );
  const eventLoading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );

  React.useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (eventLoading) {
    return <IsLoading />;
  }
  return (
    <FlatList
      data={eventList}
      renderItem={({ item }) => (
        <EventsCard navigation={navigation} events={item} />
      )}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
}
