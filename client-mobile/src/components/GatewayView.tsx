import { WebView } from "react-native-webview";
import { ToastAndroid } from "react-native";
import React from "react";
import { View } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../stores/store";
import { addEventToUser } from "../stores/reducers/eventReducer";
import IsLoading from "./IsLoading";

export default function GatewayView({ route }: any) {
  const { uri, eventId } = route.params;
  const navigation = useNavigation();
  const [paymentUri, setPaymentUri] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [isPaid, setPaid] = React.useState(false);
  const dispatch = useAppDispatch();

  const paymentToast = () => {
    ToastAndroid.showWithGravity(
      "Successfully registered",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  React.useEffect(() => {
    setPaymentUri(uri);
    setLoading(false);
  });

  const checkPayment = (newNavState: any) => {
    if (newNavState.url.includes("success") && !isPaid) {
      paymentToast();
      dispatch(addEventToUser(eventId));
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate("HomePage");
      }, 300);
      setPaid(true);
    }
  };
  return (
    <>
      {isLoading && paymentUri === "" ? (
        <IsLoading />
      ) : (
        <View flex={1}>
          <WebView
            source={{ uri: paymentUri }}
            onLoad={() => setLoading(false)}
            onNavigationStateChange={checkPayment}
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
            domStorageEnabled={true}
            cacheEnabled={true}
            allowFileAccessFromFileURLs={true}
            allowFileAccess={true}
            cacheMode="LOAD_NO_CACHE"
          />
        </View>
      )}
    </>
  );
}
