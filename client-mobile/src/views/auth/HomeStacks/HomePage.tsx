import { FlatList, View, StyleSheet } from "react-native";
import React from "react";
import { EventsCard } from "../../../components/EventsCard";
import { RootState, useAppDispatch } from "../../../stores/store";
import {
  getAllEventsByCategoryId,
  getEvents,
} from "../../../stores/reducers/eventReducer";
import { useSelector } from "react-redux";
import IsLoading from "../../../components/IsLoading";
import HeaderComponent from "../../../components/HeaderComponent";
import { Text, YStack } from "tamagui";
import Dropdown from "react-native-input-select";
import { Categories } from "../../../models/categories";
import {
  getCategories,
  getSelf,
} from "../../../stores/reducers/categoryReducer";

export default function HomePage({ navigation, route }: any) {
  const dispatch = useAppDispatch();

  const eventList = useSelector(
    (state: RootState) => state.events.events.fullEvents
  );
  const eventLoading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );
  const categories: Categories[] = useSelector(
    (state: RootState) => state.categories.fullCategories
  );

  React.useEffect(() => {
    dispatch(getCategories())
      .then(() => dispatch(getEvents()))
      .then(() => dispatch(getSelf()));
  }, [dispatch, route]);

  const data = categories.map((el) => ({ name: el.name, code: el.id }));
  data.unshift({ name: "Select All", code: -1 });

  if (eventLoading || categories.length === 0) {
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
              Home
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
                  return dispatch(getEvents());
                }
                return dispatch(getAllEventsByCategoryId(value));
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
      keyExtractor={({ id }) => id}
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
