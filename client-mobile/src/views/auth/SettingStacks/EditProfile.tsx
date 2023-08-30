import { View, Text, Button, ScrollView } from "tamagui";
//@ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { Users } from "../../../models/users";
import { TextInput, StyleSheet } from "react-native";
import { RootState, useAppDispatch } from "../../../stores/store";
import { getSelf, putUser } from "../../../stores/reducers/categoryReducer";
import { useSelector } from "react-redux";
import IsLoading from "../../../components/IsLoading";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditProfile({ navigation, route }: any) {
  const { self } = route.params;
  const [data, setData] = React.useState<Users>();
  const [showDate, setShowDate] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (self?.birthDate && self?.birthDate?.split("-").length > 0) {
      const dateIs = getFormattedDate(self.birthDate);
      setData({ ...self, birthDate: dateIs });
    } else {
      setData(self);
    }
  }, []);

  const loading = useSelector((state: RootState) => state.categories.isLoading);

  const saveChange = () => {
    dispatch(putUser(data))
      .then(() => dispatch(getSelf()))
      .then(() => navigation.navigate("SettingPage"));
  };

  function getFormattedDate(dateInput: any) {
    const dateVar = new Date(dateInput);
    var year = dateVar.getFullYear();

    var month = (1 + dateVar.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = dateVar.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function getRealDate(dateFormat: string) {
    let [month, day, year] = dateFormat.split("/");
    const dateObj = new Date(+year, +month - 1, +day);
    return dateObj;
  }

  if (loading || !data?.email) return <IsLoading />;
  return (
    <ScrollView minHeight={"100%"}>
      <View alignItems="center">
        <FontAwesome
          style={{ marginTop: 50 }}
          name={"user-circle"}
          size={120}
          color={"#E35335"}
        />
        <Text
          marginBottom={20}
          fontSize={17}
          // @ts-ignore
          fontFamily={"InterBold"}
        >
          Edit Profile
        </Text>
        <View gap={10} width={"60%"}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            // @ts-ignore
            value={data?.email}
            onChangeText={(text: string) => {
              const formattedText = text;
              // @ts-ignore
              setData({ ...data, email: formattedText });
            }}
            onEndEditing={() => {
              const formattedText = data?.email;
              // @ts-ignore
              setData({ ...data, email: formattedText });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            // @ts-ignore
            value={data?.name}
            onChangeText={(text: string) => {
              const formattedText = text;
              // @ts-ignore
              setData({ ...data, name: formattedText });
            }}
            onEndEditing={() => {
              const formattedText = data?.name;
              // @ts-ignore
              setData({ ...data, name: formattedText });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="KTP ID"
            // @ts-ignore
            value={data?.ktpId}
            onChangeText={(text: string) => {
              const formattedText = text;
              // @ts-ignore
              setData({ ...data, ktpId: formattedText });
            }}
            onEndEditing={() => {
              const formattedText = data?.ktpId;
              // @ts-ignore
              setData({ ...data, ktpId: formattedText });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            // @ts-ignore
            value={data?.phoneNumber}
            onChangeText={(text: string) => {
              const formattedText = text;
              // @ts-ignore
              setData({ ...data, phoneNumber: formattedText });
            }}
            onEndEditing={() => {
              const formattedText = data?.phoneNumber;
              // @ts-ignore
              setData({ ...data, phoneNumber: formattedText });
            }}
          />
          <TextInput
            multiline={true}
            style={{
              height: 100,
              borderWidth: 1,
              borderRadius: 4,
              padding: 10,
              backgroundColor: "#FFF",
            }}
            placeholder="Address"
            // @ts-ignore
            value={data?.address}
            onChangeText={(text: string) => {
              const formattedText = text;
              // @ts-ignore
              setData({ ...data, address: formattedText });
            }}
            onEndEditing={() => {
              const formattedText = data?.address;
              // @ts-ignore
              setData({ ...data, address: formattedText });
            }}
          />
          <Text alignSelf="center" fontWeight={"bold"}>
            Birth Date
          </Text>
          <Button
            backgroundColor={"white"}
            borderWidth={1}
            borderColor={"black"}
            onPress={() => setShowDate(true)}
          >
            {data?.birthDate ? data?.birthDate : "Input Date Birth"}
          </Button>
          {showDate && (
            <DateTimePicker
              value={
                !data?.birthDate ? new Date() : getRealDate(data?.birthDate)
              }
              onChange={(_, selectedDate: any) => {
                setShowDate(false);
                const formatDate = getFormattedDate(selectedDate);
                // @ts-ignore
                setData({
                  ...data,
                  // @ts-ignore
                  birthDate: formatDate,
                });
              }}
            />
          )}
          <Button
            marginVertical={10}
            size={"$4"}
            backgroundColor={"$orange10Dark"}
            onPress={saveChange}
          >
            <Text
              color={"white"}
              // @ts-ignore
              fontFamily={"InterBold"}
            >
              Save Data
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#FFF",
  },
});
