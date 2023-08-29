import { View, Text } from "tamagui";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import IsLoading from "../../../components/IsLoading";
import { StyleSheet } from "react-native";
import { CheckpointData } from "../../../models/checkpointData";
import { useNavigation } from "@react-navigation/native";

export default function CameraQuestion({ route }: any) {
  const { fixQuiz } = route.params;
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [scanData, setScanData] = React.useState<CheckpointData>();

  React.useEffect(() => {
    const permission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setLoading(false);
    };
    permission();
  }, []);

  const handleScanner = ({ type, data }: { type: any; data: string }) => {
    const quiz: CheckpointData = JSON.parse(data);
    setScanData(quiz);
    for (let i = 0; i < fixQuiz.length; i++) {
      if (fixQuiz[i].CheckpointId === quiz.id) {
        // @ts-ignore
        navigation.navigate("QuizSection", {
          quiz: fixQuiz[i],
          checkpointNum: i + 1,
        });
      }
    }
  };

  if (isLoading) {
    return <IsLoading />;
  }
  if (!hasPermission) {
    return (
      <View>
        <Text>Please Grant Camera Permission to Use This App</Text>
      </View>
    );
  }
  return (
    <View
      flex={1}
      backgroundColor={"#FFF"}
      alignItems="center"
      justifyContent="center"
    >
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        // @ts-ignore
        onBarCodeScanned={scanData ? undefined : handleScanner}
      />
    </View>
  );
}
