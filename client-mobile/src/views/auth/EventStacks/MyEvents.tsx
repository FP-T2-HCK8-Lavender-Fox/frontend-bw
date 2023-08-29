import { FlatList } from "react-native";
import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getEventsOfUsers } from "../../../stores/reducers/eventReducer";
import { useSelector } from "react-redux";
import IsLoading from "../../../components/IsLoading";
import { UserEvents } from "../../../models/userEvents";
import { EventsCard } from "../../../components/EventsCard";

export default function MyEvents({ navigation, route }: any) {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getEventsOfUsers());
  }, [dispatch]);

  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );
  const event: UserEvents[] = useSelector(
    (state: RootState) => state.events.events.eventsOfUser
  );

  const eventList = event.map((ele) => ({
    id: ele.EventId,
    name: ele.Event.name,
    startDate: ele.Event.startDate,
    endDate: ele.Event.endDate,
    active: ele.Event.active,
    description: ele.Event.description,
    amount: ele.Event.amount,
    address: ele.Event.address,
    lat: ele.Event.lat,
    long: ele.Event.long,
    pics: ele.Event.pics,
    CategoryId: ele.Event.CategoryId,
    AdminId: ele.Event.AdminId,
    createdAt: ele.Event.createdAt,
    updatedAt: ele.Event.updatedAt,
    Admin: null,
    Category: null,
  }));

  if (loading) {
    return <IsLoading />;
  }
  return (
    <FlatList
      data={eventList}
      renderItem={({ item }) => (
        <EventsCard navigation={navigation} events={item} route={route} />
      )}
      //@ts-ignore
      keyExtractor={({ AdminId }) => AdminId}
    ></FlatList>
  );
}
