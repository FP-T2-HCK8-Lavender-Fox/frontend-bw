import { FlatList, View, StyleSheet } from "react-native";
import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import {
  getEventsOfUsers,
  getUserEventsByCategory,
} from "../../../stores/reducers/eventReducer";
import { useSelector } from "react-redux";
import IsLoading from "../../../components/IsLoading";
import { UserEvents } from "../../../models/userEvents";
import { EventsCard } from "../../../components/EventsCard";
import HeaderComponent from "../../../components/HeaderComponent";
import { YStack } from "tamagui";
import { Text } from "tamagui";
import Dropdown from "react-native-input-select";
import { getCategories } from "../../../stores/reducers/categoryReducer";
import { Categories } from "../../../models/categories";

export default function MyEvents({ navigation, route }: any) {
  const dispatch = useAppDispatch();

  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );
  const event: UserEvents[] = useSelector(
    (state: RootState) => state.events.events.eventsOfUser
  );
  const categories: Categories[] = useSelector(
    (state: RootState) => state.categories.fullCategories
  );
  React.useEffect(() => {
    dispatch(getEventsOfUsers());
    dispatch(getCategories());
  }, [dispatch, route]);

  console.log(event);

  const eventList = event?.map((ele) => ({
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

  const data = categories?.map((el) => ({ name: el.name, code: el.id }));
  data.unshift({ name: "Select All", code: -1 });

  if (loading || categories.length === 0) {
    return <IsLoading />;
  }
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <HeaderComponent />
          <YStack
            marginVertical={20}
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
              My Events
            </Text>
            <Dropdown
              placeholder="Categories"
              options={data}
              optionLabel={"name"}
              optionValue={"code"}
              primaryColor={"orange"}
              dropdownStyle={{
                borderWidth: 1, // To remove border, set borderWidth to 0
              }}
              placeholderStyle={{
                color: "black",
                fontSize: 15,
              }}
              labelStyle={{ color: "black", fontSize: 15, fontWeight: "500" }}
              onValueChange={(value: any) => {
                if (value === -1) {
                  return dispatch(getEventsOfUsers());
                }
                return dispatch(getUserEventsByCategory(value));
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
                  <Text style={styles.text}>Select Categories</Text>
                </View>
              }
              modalOptionsContainerStyle={{
                padding: 10,
                backgroundColor: "white",
              }}
            />
          </YStack>
        </>
      }
      data={eventList}
      renderItem={({ item }) => (
        <EventsCard navigation={navigation} events={item} route={route} />
      )}
      //@ts-ignore
      keyExtractor={({ AdminId }) => AdminId}
    ></FlatList>
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
