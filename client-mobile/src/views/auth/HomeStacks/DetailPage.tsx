import { Dimensions } from "react-native";
import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import {
  addEventToUser,
  getEventById,
} from "../../../stores/reducers/eventReducer";
import MapView, { Marker } from "react-native-maps";
import { Button, Image, ScrollView, View, Text, Paragraph } from "tamagui";
import { Events } from "../../../models/events";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

export default function DetailPage({ route }: { route: any }) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [mapLocation, setMapLocation] = React.useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.008,
    longitudeDelta: 0.007,
  });

  const event: Events = useSelector(
    (state: RootState) => state.events.events.eventById
  );
  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );

  React.useEffect(() => {
    dispatch(getEventById(id));
    setMapLocation({
      ...mapLocation,
      latitude: Number(event.lat),
      longitude: Number(event.long),
    });
  }, [dispatch]);

  const addToUser = () => {
    dispatch(addEventToUser(id))
      .then((success) => {
        // @ts-ignore
        return navigation.pop();
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView flex={1}>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: 200,
        }}
        region={mapLocation}
      >
        <Marker coordinate={mapLocation} title="Marker" />
      </MapView>
      <View
        paddingHorizontal={20}
        paddingTop={12}
        marginBottom={130}
        borderTopWidth={1}
        borderTopColor={"black"}
      >
        <Text
          fontSize={18}
          fontWeight={"700"}
          marginVertical={3}
          color={"#E35335"}
        >
          {event.Category?.name}
        </Text>
        <Text fontSize={20} fontWeight={"700"} marginVertical={3}>
          {event.name}
        </Text>
        <Text fontSize={15} marginVertical={3}>
          Created by {event.Admin?.name}
        </Text>
        <Image
          alignSelf="center"
          marginVertical={4}
          borderRadius={20}
          // @ts-ignore
          source={{ uri: event.pics, width: "100%", height: 200 }}
        />
        <Paragraph
          marginVertical={3}
          borderBottomWidth={1}
          borderBottomColor={"black"}
        >
          Description :{"\n"}
          {event.description}
        </Paragraph>
        <Text fontSize={15} marginVertical={6}>
          <Text fontSize={15} fontWeight={"700"}>
            Start :
          </Text>{" "}
          {new Date(event.startDate).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}{" "}
          WIB
        </Text>
        <Text fontSize={15} marginVertical={3}>
          <Text fontSize={15} fontWeight={"700"}>
            End :
          </Text>{" "}
          {new Date(event.endDate).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}{" "}
          WIB
        </Text>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: "#FFBF00",
            borderRadius: 10,
            elevation: 6,
          }}
          initialDate={event.startDate}
          minDate={event.startDate}
          maxDate={event.endDate}
          disableAllTouchEventsForDisabledDays={true}
          disableArrowRight={true}
          disableArrowLeft={true}
        />
        <Text
          // @ts-ignore
          fontFamily={"CoolveticaItalic"}
          marginTop={30}
          marginBottom={3}
          fontSize={18}
        >
          Participate in the event and win the prize
        </Text>
        <Text
          // @ts-ignore
          fontFamily={"CoolveticaItalic"}
          marginTop={3}
          marginBottom={3}
        >
          By joining this event, i agree to pay the amount of Rp100.000,- by the
          terms of condition
        </Text>
        <Button
          onPress={addToUser}
          backgroundColor={"#E35335"}
          size="$6"
          elevation={7}
        >
          <Text
            // @ts-ignore
            fontFamily={"Coolvetica"}
            fontSize={20}
            color={"white"}
          >
            PARTICIPATE
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
