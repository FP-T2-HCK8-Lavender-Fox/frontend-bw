import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getEventOfUserByEventId } from "../../../stores/reducers/eventReducer";
import MapView, { Marker } from "react-native-maps";
import { Button, ScrollView, View, Text, Image } from "tamagui";
import { useSelector } from "react-redux";
import { UserEventByEventId } from "../../../models/userEventByEventId";
import IsLoading from "../../../components/IsLoading";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const now = new Date().getTime();

export default function DetailMyEvent({ route }: any) {
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const navigation = useNavigation();

  const [error, setError] = React.useState(false);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return setError(!error);
    }
    // @ts-ignore
    return await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  };

  React.useEffect(() => {
    dispatch(getEventOfUserByEventId(id));
    userLocation();
  }, [dispatch, route]);

  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );
  const event: UserEventByEventId = useSelector(
    (state: RootState) => state.events.events.eventOfUserById
  );

  const eventDate = new Date(event.dataEvents.Event.startDate).getTime();
  const eventEndDate = new Date(event.dataEvents.Event.endDate).getTime();

  const data = event.dataEvents.Event;
  let quizzesCheckpointAnswer = [];
  for (const el of event.answerQuizData) {
    for (const ele of event.checkpointData) {
      if (el.CheckpointId === ele.id) {
        quizzesCheckpointAnswer.push({
          ...ele,
          id: el.id,
          CheckpointId: el.CheckpointId,
          trueOrFalse: el.trueOrFalse,
        });
      }
    }
  }

  const fixQuiz = quizzesCheckpointAnswer.sort(
    (a, b) => a.CheckpointId - b.CheckpointId
  );

  const goToOtherParticipants = () => {
    // @ts-ignore
    navigation.navigate("OtherParticipants", {
      id: id,
    });
  };

  const goToCamera = () => {
    // @ts-ignore
    navigation.navigate("CameraForQuiz", {
      fixQuiz: fixQuiz,
    });
  };

  if (loading || fixQuiz.length === 0) {
    return <IsLoading />;
  }
  if (error) {
    return (
      <View>
        <Text>Please Grant Location Permission to Use This App</Text>
      </View>
    );
  }
  return (
    <>
      <ScrollView flex={1}>
        {now < eventDate ? (
          <>
            <MapView
              style={{
                width: Dimensions.get("window").width,
                height: 600,
              }}
              region={{
                latitude: Number(data.lat),
                longitude: Number(data.long),
                latitudeDelta: 0.008,
                longitudeDelta: 0.007,
              }}
              showsUserLocation={true}
              zoomControlEnabled={true}
              zoomEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: Number(data.lat),
                  longitude: Number(data.long),
                  // @ts-ignore
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.007,
                }}
                title="Marker"
              />
            </MapView>
            <View
              paddingHorizontal={20}
              paddingTop={12}
              paddingBottom={130}
              borderTopWidth={1}
              borderTopColor={"black"}
            >
              <Text
                textAlign="center"
                marginTop={20}
                fontSize={25}
                fontWeight={"500"}
              >
                {data.name}
              </Text>
              <Text
                textAlign="center"
                marginVertical={2}
                fontSize={20}
                fontWeight={"500"}
              >
                This is your location for this event
              </Text>
              <Text
                textAlign="center"
                marginVertical={10}
                fontSize={15}
                fontWeight={"400"}
              >
                {data.description}
              </Text>

              <Text
                textAlign="center"
                marginVertical={4}
                fontSize={15}
                fontWeight={"400"}
              >
                Come to the location and open this page on{" "}
                {new Date(data.startDate).toLocaleDateString("en-EN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>
              <Button
                marginVertical={10}
                opacity={0.5}
                backgroundColor={"#000000"}
                color={"white"}
                disabled={true}
              >
                Go To Checkpoint
              </Button>
              <Button
                marginVertical={10}
                backgroundColor={"#E35335"}
                color={"white"}
                onPress={goToOtherParticipants}
              >
                Other Participants
              </Button>
            </View>
          </>
        ) : now > eventDate && now < eventEndDate ? (
          <>
            {fixQuiz[0].trueOrFalse === null ||
            fixQuiz[1].trueOrFalse === null ||
            fixQuiz[2].trueOrFalse === null ? (
              <>
                <MapView
                  style={{
                    width: Dimensions.get("window").width,
                    height: 400,
                  }}
                  showsUserLocation={true}
                  zoomControlEnabled={true}
                  zoomEnabled={true}
                  region={
                    fixQuiz[0].trueOrFalse === null
                      ? {
                          latitude: Number(fixQuiz[0].lat),
                          longitude: Number(fixQuiz[0].long),
                          latitudeDelta: 0.008,
                          longitudeDelta: 0.007,
                        }
                      : fixQuiz[1].trueOrFalse === null
                      ? {
                          latitude: Number(fixQuiz[1].lat),
                          longitude: Number(fixQuiz[1].long),
                          latitudeDelta: 0.008,
                          longitudeDelta: 0.007,
                        }
                      : {
                          latitude: Number(fixQuiz[2].lat),
                          longitude: Number(fixQuiz[2].long),
                          latitudeDelta: 0.008,
                          longitudeDelta: 0.007,
                        }
                  }
                >
                  <Marker
                    coordinate={
                      fixQuiz[0].trueOrFalse === null
                        ? {
                            latitude: Number(fixQuiz[0].lat),
                            longitude: Number(fixQuiz[0].long),
                            // @ts-ignore
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.007,
                          }
                        : fixQuiz[1].trueOrFalse === null
                        ? {
                            latitude: Number(fixQuiz[1].lat),
                            longitude: Number(fixQuiz[1].long),
                            // @ts-ignore
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.007,
                          }
                        : {
                            latitude: Number(fixQuiz[2].lat),
                            longitude: Number(fixQuiz[2].long),
                            // @ts-ignore
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.007,
                          }
                    }
                    title="Marker"
                  />
                </MapView>
                <View
                  paddingHorizontal={20}
                  paddingTop={12}
                  paddingBottom={130}
                  alignItems="center"
                  borderTopColor={"black"}
                >
                  <Text
                    textAlign="center"
                    marginTop={20}
                    fontSize={25}
                    fontWeight={"500"}
                  >
                    {data.name}
                  </Text>
                  <Text
                    textAlign="center"
                    marginVertical={6}
                    fontSize={20}
                    fontWeight={"400"}
                  >
                    {fixQuiz[0].trueOrFalse === null
                      ? "Checkpoint 1"
                      : fixQuiz[1].trueOrFalse === null
                      ? "Checkpoint 2"
                      : "Checkpoint 3"}
                  </Text>
                  <Text marginVertical={4} textAlign="center">
                    Instruction:{"\n"}
                    Go To the Location Displayed On the Map. There will be a QR
                    Code and You Need To Scan It to Answer The Question and Win
                    the Prize
                  </Text>
                  <Button
                    marginVertical={10}
                    backgroundColor={"#000000"}
                    color={"white"}
                    onPress={goToCamera}
                  >
                    Go To Camera
                  </Button>
                  <Button
                    marginVertical={10}
                    backgroundColor={"#E35335"}
                    color={"white"}
                    onPress={goToOtherParticipants}
                  >
                    Other Participants
                  </Button>
                </View>
              </>
            ) : (
              <>
                <View
                  paddingHorizontal={50}
                  minHeight={Dimensions.get("window").height}
                >
                  <Image
                    marginTop={180}
                    resizeMode="contain"
                    source={require("../../../../assets/pororo.png")}
                    maxHeight={260}
                    alignSelf="center"
                  />
                  <Text marginTop={20} textAlign="center" fontWeight={"400"}>
                    Thanks for join our event! We are counting your point and
                    you will be get notify after the points are counted
                  </Text>
                  <Button
                    marginVertical={10}
                    backgroundColor={"#E35335"}
                    color={"white"}
                    onPress={goToOtherParticipants}
                  >
                    Other Participants
                  </Button>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <View
              paddingHorizontal={50}
              minHeight={Dimensions.get("window").height}
            >
              <Image
                marginTop={180}
                resizeMode="contain"
                source={require("../../../../assets/pororo.png")}
                maxHeight={260}
                alignSelf="center"
              />
              <Text marginTop={20} textAlign="center" fontWeight={"400"}>
                Thanks for join our event! We are counting your point and you
                will be get notify after the points are counted
              </Text>
              <Button
                marginVertical={10}
                backgroundColor={"#E35335"}
                color={"white"}
                onPress={goToOtherParticipants}
              >
                Other Participants
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}
