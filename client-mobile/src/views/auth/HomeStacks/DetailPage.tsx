import { Dimensions, ToastAndroid } from "react-native";
import React, { useRef } from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import {
  getEventById,
  postPayment,
} from "../../../stores/reducers/eventReducer";
import MapView, { Marker } from "react-native-maps";
import {
  Button,
  Image,
  ScrollView,
  View,
  Text,
  Paragraph,
  Card,
  YStack,
  XStack,
} from "tamagui";
import { Events } from "../../../models/events";
import { Calendar } from "react-native-calendars";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import IsLoading from "../../../components/IsLoading";
import { Users } from "../../../models/users";

export default function DetailPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["25%", "50%", "50%"];
  const { id } = route.params;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch]);

  const failedToast = () => {
    ToastAndroid.showWithGravity(
      "Failed to participate, please fill your profile first",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  function handlePresentModal() {
    if (
      !myself.ktpId ||
      !myself.birthDate ||
      !myself.phoneNumber ||
      !myself.address
    ) {
      failedToast();
      // @ts-ignore
      return navigation.navigate("EditProfile", {
        self: myself,
      });
    }
    bottomSheetRef.current?.present();
    dispatch(postPayment());
    setTimeout(() => {
      setModalOpen(true);
    }, 100);
  }

  function doNone() {
    return;
  }

  function collapsing() {
    bottomSheetRef.current?.forceClose();
  }

  function paying() {
    bottomSheetRef.current?.forceClose();
    //@ts-ignore
    navigation.navigate("GatewayView", {
      uri: paymentUri.redirect_url,
      eventId: id,
    });
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  const myself: Users = useSelector(
    (state: RootState) => state.categories.userSelf
  );
  const event: Events = useSelector(
    (state: RootState) => state.events.events.eventById
  );
  const paymentUri = useSelector(
    (state: RootState) => state.events.events.paymentUri
  );
  const loading = useSelector(
    (state: RootState) => state.events.events.isLoading
  );

  if (loading || !event) {
    return <IsLoading />;
  }
  return (
    <>
      <ScrollView
        flex={1}
        opacity={modalOpen ? 0.5 : 1}
        onTouchEnd={modalOpen ? collapsing : doNone}
      >
        <Image
          alignSelf="center"
          resizeMode="cover"
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
          shadowColor="#000"
          shadowOffset={{
            width: 0,
            height: 2,
          }}
          shadowOpacity={1}
          shadowRadius={4}
          // @ts-ignore
          source={{ uri: event.pics, width: "100%", height: 260 }}
        />

        <View paddingBottom={40}>
          <Text
            fontSize={18}
            fontWeight={"700"}
            marginVertical={3}
            color={"#E35335"}
            //@ts-ignore
            fontFamily={"Kredit"}
            alignSelf="center"
            marginTop={20}
          >
            {event.Category?.name}
          </Text>
          <Text
            fontSize={20}
            fontWeight={"700"}
            marginVertical={3}
            alignSelf="center"
          >
            {event.name}
          </Text>
          <Text
            fontSize={15}
            marginTop={3}
            marginBottom={10}
            alignSelf="center"
          >
            Created by {event.Admin?.name}
          </Text>
          <MapView
            style={{
              marginHorizontal: 40,
              height: 200,
            }}
            region={{
              latitude: Number(event.lat),
              longitude: Number(event.long),
              latitudeDelta: 0.008,
              longitudeDelta: 0.007,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(event.lat),
                longitude: Number(event.long),
                // @ts-ignore
                latitudeDelta: 0.008,
                longitudeDelta: 0.007,
              }}
              title="Marker"
            />
          </MapView>
          <Card
            animation="bouncy"
            size="$4"
            alignSelf="center"
            width="90%"
            height={120}
            scale={0.9}
            pressStyle={{ scale: 0.875 }}
            marginVertical={20}
          >
            <Card.Header marginTop={8}>
              <Text
                position="absolute"
                right={40}
                top={15}
                fontSize={10}
                textAlign="right"
                margin={0}
                fontWeight={"600"}
              >
                Description :
              </Text>
              <Text
                position="absolute"
                right={47}
                top={26}
                left={160}
                fontSize={10}
                textAlign="justify"
                margin={0}
                padding={0}
              >
                {event.description}
              </Text>
            </Card.Header>
            <Card.Footer>
              <YStack
                bottom={6}
                left={8}
                backgroundColor={"rgba(246, 239, 233, 0)"}
                padding={27}
                position="absolute"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontWeight={"bold"} color={"#E35335"}>
                  {new Date(event.startDate).getDate()}
                </Text>
                <Text fontWeight={"bold"} color={"#E35335"}>
                  {new Date(event.startDate).toLocaleDateString("en-EN", {
                    month: "short",
                  })}
                </Text>
                <XStack>
                  <Text fontWeight={"bold"} color={"#E35335"}>
                    {new Date(event.startDate).getHours()}
                    {"-"}
                  </Text>
                  <Text fontWeight={"bold"} color={"#E35335"}>
                    {new Date(event.endDate).getHours()}
                  </Text>
                </XStack>
              </YStack>
            </Card.Footer>
            <Card.Background
              borderRadius="$5"
              backgroundColor={"rgba(0,0,0,0)"}
            >
              <Image
                resizeMode="contain"
                flex={1}
                alignSelf="center"
                // @ts-ignore
                source={require("../../../../assets/card-description.png")}
              />
            </Card.Background>
          </Card>

          <Calendar
            style={{
              borderWidth: 1,
              borderColor: "#FFBF00",
              borderRadius: 10,
              elevation: 6,
              marginHorizontal: 40,
            }}
            initialDate={event.startDate}
            minDate={event.startDate}
            maxDate={event.endDate}
            disableAllTouchEventsForDisabledDays={true}
            disableArrowRight={true}
            disableArrowLeft={true}
          />
          <Text
            marginTop={30}
            marginBottom={3}
            fontSize={18}
            marginHorizontal={50}
          >
            Participate in the event and win the prize
          </Text>
          <Text
            // @ts-ignore
            fontFamily={"CoolveticaItalic"}
            marginTop={3}
            marginBottom={3}
            marginHorizontal={50}
          >
            By joining this event, i agree to pay the amount of Rp100.000,- by
            the terms of condition
          </Text>
          <Button
            marginTop={17}
            marginHorizontal={20}
            onPress={handlePresentModal}
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
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onDismiss={() => setModalOpen(false)}
      >
        <View flex={1} alignItems="center">
          <Text
            color={"black"}
            paddingHorizontal={20}
            marginVertical={10}
            fontWeight={"600"}
            fontSize={16}
            textAlign="center"
          >
            Anda menyetujui pembayaran sebesar Rp100.000,-?
          </Text>
          <Image
            resizeMode="contain"
            source={require("../../../../assets/coin.png")}
            maxHeight={260}
          />
          <View flexDirection={"row"} gap={10}>
            <Button backgroundColor={"#E35335"} onPress={paying}>
              <Text color={"white"} fontWeight={"400"}>
                Yes
              </Text>
            </Button>
            <Button backgroundColor={"#FFBF00"} onPress={collapsing}>
              <Text color={"black"} fontWeight={"400"}>
                No
              </Text>
            </Button>
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
}
