import React from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getEventOfUserByEventId } from "../../../stores/reducers/eventReducer";
import MapView, { Marker } from "react-native-maps";
import { Button, ScrollView, View, Text, Image, YStack } from "tamagui";
import { useSelector } from "react-redux";
import { UserEventByEventId } from "../../../models/userEventByEventId";
import IsLoading from "../../../components/IsLoading";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../../utils/googleApi";

const now = new Date().getTime();
const LOCATION_DISTANCE_TRESHOLD = 1;

export default function DetailMyEvent({ route }: any) {
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const navigation = useNavigation();

  const [userLat, setUserLat] = React.useState<number>();
  const [userLong, setUserLong] = React.useState<number>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    dispatch(getEventOfUserByEventId(id));
    // @ts-ignore
    let subscription: Location.Subscription | null = null;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return setError(!error);
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: LOCATION_DISTANCE_TRESHOLD,
        },
        (location) => {
          const { coords } = location;
          const {
            latitude,
            longitude,
          }: { latitude: number; longitude: number } = coords;
          setUserLat(latitude);
          setUserLong(longitude);
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
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

  if (loading || fixQuiz.length === 0 || !userLat) {
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
              <MapViewDirections
                origin={{
                  latitude: userLat,
                  // @ts-ignore
                  longitude: userLong,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.007,
                }}
                destination={{
                  latitude: Number(data.lat),
                  longitude: Number(data.long),
                }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor="blue"
              />
            </MapView>
            <View
              paddingHorizontal={20}
              paddingTop={12}
              paddingBottom={20}
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
            {(fixQuiz[0].trueOrFalse === null ||
              fixQuiz[1].trueOrFalse === null ||
              fixQuiz[2].trueOrFalse === null) &&
            event.leaderboard === null ? (
              <>
                <MapView
                  style={{
                    width: Dimensions.get("window").width,
                    height: 500,
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
                  <MapViewDirections
                    origin={{
                      latitude: userLat,
                      // @ts-ignore
                      longitude: userLong,
                      latitudeDelta: 0.008,
                      longitudeDelta: 0.007,
                    }}
                    destination={
                      fixQuiz[0].trueOrFalse === null
                        ? {
                            latitude: Number(fixQuiz[0].lat),
                            longitude: Number(fixQuiz[0].long),
                          }
                        : fixQuiz[1].trueOrFalse === null
                        ? {
                            latitude: Number(fixQuiz[1].lat),
                            longitude: Number(fixQuiz[1].long),
                          }
                        : {
                            latitude: Number(fixQuiz[2].lat),
                            longitude: Number(fixQuiz[2].long),
                          }
                    }
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue"
                  />
                </MapView>
                <View
                  paddingHorizontal={20}
                  paddingTop={12}
                  paddingBottom={20}
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
                  <Text marginVertical={4}>
                    Instruction:{"\n"}
                    1. You need to get into the location.{"\n"}
                    2. There will be a QR Code in that location.{"\n"}
                    3. Scan the QR Code, answer the quiz that displayed on the
                    screen.{"\n"}
                    4. If the answer are true, you will get the point.
                  </Text>
                  <Button
                    marginVertical={10}
                    backgroundColor={"#000000"}
                    color={"white"}
                    width={180}
                    onPress={goToCamera}
                  >
                    Scan QR
                  </Button>
                  <Button
                    marginVertical={10}
                    backgroundColor={"#E35335"}
                    width={180}
                    color={"white"}
                    onPress={goToOtherParticipants}
                  >
                    Other Participants
                  </Button>
                </View>
              </>
            ) : fixQuiz[0].trueOrFalse &&
              fixQuiz[1].trueOrFalse &&
              fixQuiz[2].trueOrFalse &&
              event.leaderboard === null ? (
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
            ) : (
              <View minHeight={Dimensions.get("window").height}>
                <YStack
                  marginTop={50}
                  alignItems="center"
                  marginHorizontal={40}
                  backgroundColor={"white"}
                  elevation={4}
                  borderRadius={30}
                >
                  <Image
                    marginTop={30}
                    resizeMode="contain"
                    source={require("../../../../assets/winner.png")}
                    maxHeight={400}
                  />
                  <Text
                    // @ts-ignore
                    fontFamily={"Coolvetica"}
                    marginTop={40}
                    fontWeight={"600"}
                    fontSize={30}
                  >
                    Congratulations
                  </Text>
                  <Text
                    // @ts-ignore
                    fontFamily={"Coolvetica"}
                    marginTop={10}
                    fontWeight={"600"}
                    marginHorizontal={20}
                    fontSize={19}
                    textAlign="center"
                  >
                    You are the winner of this challenge!{"\n"}
                    You are getting the{" "}
                    {
                      // @ts-ignore
                      event.leaderboard.position === 1
                        ? "1st"
                        : // @ts-ignore
                        event.leaderboard.position === 2
                        ? "2nd"
                        : "3rd"
                    }{" "}
                    position of this events!
                  </Text>
                  <Text
                    // @ts-ignore
                    fontFamily={"Coolvetica"}
                    marginTop={10}
                    fontWeight={"600"}
                    marginHorizontal={20}
                    fontSize={15}
                    textAlign="center"
                    color={"$color.orange9Dark"}
                  >
                    Admin will contact you as soon as possible to send your
                    reward! Thank you for participating
                  </Text>
                </YStack>
              </View>
            )}
          </>
        ) : event.leaderboard === null ? (
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
        ) : (
          <View minHeight={Dimensions.get("window").height}>
            <YStack
              marginTop={50}
              alignItems="center"
              marginHorizontal={40}
              backgroundColor={"white"}
              elevation={4}
              borderRadius={30}
            >
              <Image
                marginTop={30}
                resizeMode="contain"
                source={require("../../../../assets/winner.png")}
                maxHeight={400}
              />
              <Text
                // @ts-ignore
                fontFamily={"Coolvetica"}
                marginTop={40}
                fontWeight={"600"}
                fontSize={30}
              >
                Congratulations
              </Text>
              <Text
                // @ts-ignore
                fontFamily={"Coolvetica"}
                marginTop={10}
                fontWeight={"600"}
                marginHorizontal={20}
                fontSize={19}
                textAlign="center"
              >
                You are the winner of this challenge!{"\n"}
                You are getting the{" "}
                {
                  // @ts-ignore
                  event.leaderboard.position === 1
                    ? "1st"
                    : // @ts-ignore
                    event.leaderboard.position === 2
                    ? "2nd"
                    : "3rd"
                }{" "}
                position of this events!
              </Text>
              <Text
                // @ts-ignore
                fontFamily={"Coolvetica"}
                marginTop={10}
                fontWeight={"600"}
                marginHorizontal={20}
                fontSize={15}
                textAlign="center"
                color={"$color.orange9Dark"}
              >
                Admin will contact you as soon as possible to send your reward!
                Thank you for participating
              </Text>
            </YStack>
          </View>
        )}
      </ScrollView>
    </>
  );
}
