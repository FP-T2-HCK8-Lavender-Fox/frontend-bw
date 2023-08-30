import { View, Text, YStack } from "tamagui";
import { FlatList } from "react-native";
import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import { getInactiveUserEvents } from "../../../stores/reducers/categoryReducer";
import IsLoading from "../../../components/IsLoading";
import HeaderComponent from "../../../components/HeaderComponent";
import EventHistoryCard from "../../../components/EventHistoryCard";
import { UserEvents } from "../../../models/userEvents";

export default function HistoryEvents() {
  const dispatch = useAppDispatch();
  const historyEvents: UserEvents[] = useSelector(
    (state: RootState) => state.categories.historyUserEvents
  );
  const loading = useSelector((state: RootState) => state.categories.isLoading);
  React.useState(() => {
    dispatch(getInactiveUserEvents());
  });

  const eventList = historyEvents?.map((ele) => ({
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

  if (loading) return <IsLoading />;
  if (eventList.length === 0) {
    return (
      <View minHeight={"100%"}>
        <Text textAlign="center" marginTop="70%">
          Oops, you don't have any history of event
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <HeaderComponent />
          <YStack
            marginVertical={10}
            paddingHorizontal={27}
            alignItems="center"
          >
            <Text
              // @ts-ignore
              fontFamily={"Coolvetica"}
              fontSize={30}
              fontWeight={"600"}
              marginBottom={10}
            >
              Events History
            </Text>
          </YStack>
        </>
      }
      data={eventList}
      renderItem={({ item }) => (
        <EventHistoryCard
          event={item}
          //@ts-ignore
          keyExtractor={({ id }) => id}
        />
      )}
    />
  );
}
