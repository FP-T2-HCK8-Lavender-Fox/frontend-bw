import { WebView } from "react-native-webview";
import { ActivityIndicator, ToastAndroid } from "react-native";
import React from "react";
import { View } from "tamagui";
import { useNavigation } from "@react-navigation/native";

export default function GatewayView({ route }: any) {
  const { uri } = route.params;
  const navigation = useNavigation();
  const [paymentUri, setPaymentUri] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);

  const paymentToast = () => {
    ToastAndroid.showWithGravity(
      "Successfully paid",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  React.useEffect(() => {
    setPaymentUri(uri);
    setLoading(false);
  });

  const checkPayment = (newNavState: any) => {
    if (newNavState.url.includes("success")) {
      paymentToast();
      setTimeout(() => {
        // @ts-ignore
        navigation.navigate("HomePage");
      }, 300);
    }
  };
  return (
    <>
      {isLoading && paymentUri === "" ? (
        <View position="absolute" right={0} left={0} top="50%">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View flex={1} marginBottom={100}>
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
