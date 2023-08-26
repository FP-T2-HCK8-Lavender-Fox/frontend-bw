import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme, YStack } from "tamagui";
import config from "./tamagui.config";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigations/AuthStack";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Coolvetica: require("./assets/fonts/coolvetica/coolvetica-rg.otf"),
    CoolveticaItalic: require("./assets/fonts/coolvetica/coolvetica-rg-it.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
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
    </TamaguiProvider>
  );
}
