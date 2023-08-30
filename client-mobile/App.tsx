import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme, YStack } from "tamagui";
import config from "./tamagui.config";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigations/AuthStack";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./src/stores/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Coolvetica: require("./assets/fonts/coolvetica/coolvetica-rg.otf"),
    CoolveticaItalic: require("./assets/fonts/coolvetica/coolvetica-rg-it.otf"),
    Kredit: require("./assets/fonts/kredit/kredit-back.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TamaguiProvider config={config}>
          <BottomSheetModalProvider>
            <Theme name={colorScheme === "dark" ? "dark" : "light"}>
              <YStack
                f={1}
                bg="$backgroundTransparent"
                style={{ marginTop: StatusBar.currentHeight }}
              >
                <AuthProvider>
                  <NavigationContainer>
                    <AuthStack />
                  </NavigationContainer>
                </AuthProvider>
              </YStack>
            </Theme>
          </BottomSheetModalProvider>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
