import { Dimensions, ToastAndroid } from "react-native";
import React, { useRef } from "react";
import { RootState, useAppDispatch } from "../../../stores/store";
import { useSelector } from "react-redux";
import {
  getEventById,
  postPayment,
} from "../../../stores/reducers/eventReducer";
import MapView, { Marker } from "react-native-maps";
import { Button, Image, ScrollView, View, Text, Paragraph } from "tamagui";
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
        <MapView
          style={{
            width: Dimensions.get("window").width,
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
        <View
          paddingHorizontal={20}
          paddingTop={12}
          paddingBottom={12}
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
            {new Date(event.startDate).toLocaleDateString("en-EN", {
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
            {new Date(event.endDate).toLocaleDateString("en-EN", {
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
            By joining this event, i agree to pay the amount of Rp100.000,- by
            the terms of condition
          </Text>
          <Button
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
