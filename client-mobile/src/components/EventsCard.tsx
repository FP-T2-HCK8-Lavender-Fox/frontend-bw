import { Card, Image, Paragraph, Text, XStack, YStack } from "tamagui";
import React from "react";

export const EventsCard = ({
  events,
  navigation,
  route,
}: {
  events: any;
  navigation: any;
  route: any;
}) => {
  return (
    <XStack
      pt={10}
      $sm={{ flexDirection: "column", alignItems: "center" }}
      space
    >
      <Card
        animation="bouncy"
        elevation={2}
        size="$4"
        width="90%"
        height={200}
        scale={0.9}
        borderRadius="$5"
        pressStyle={{ scale: 0.875 }}
        onPress={() =>
          route.name === "HomePage"
            ? navigation.navigate("DetailHomePage", {
                id: events.id,
              })
            : navigation.navigate("DetailMyEvent", {
                id: events.id,
              })
        }
      >
        <Card.Header padded>
          <XStack
            top={20}
            backgroundColor={"rgba(246, 239, 233, 0.6)"}
            padding={40}
            borderRadius={80}
            right={20}
            position="absolute"
            justifyContent="center"
            alignItems="center"
          >
            <YStack position="absolute">
              <Text
                textAlign="center"
                //@ts-ignore
                fontFamily={"Coolvetica"}
                color={"white"}
                fontSize={30}
              >
                {new Date(events.startDate).getDate()}
              </Text>
              <Text
                textAlign="center"
                //@ts-ignore
                fontFamily={"Coolvetica"}
                color={"white"}
                fontSize={21}
              >
                {new Date(events.startDate).toLocaleDateString("en-EN", {
                  month: "short",
                })}
              </Text>
            </YStack>
          </XStack>
        </Card.Header>
        <Card.Footer>
          <YStack marginLeft={14} marginBottom={14}>
            <Text
              textShadowColor={"rgba(0, 0, 0, 0.75)"}
              textShadowOffset={{ width: -1, height: 1 }}
              textShadowRadius={10}
              //@ts-ignore
              fontFamily={"Kredit"}
              fontSize={22}
              fontWeight={"600"}
              color={"white"}
            >
              {events.name}
            </Text>

            <Paragraph
              textShadowColor={"rgba(0, 0, 0, 0.75)"}
              textShadowOffset={{ width: -1, height: 1 }}
              textShadowRadius={10}
              color={"white"}
            >
              {events.description}
            </Paragraph>
          </YStack>
        </Card.Footer>
        <Card.Background borderRadius="$5" backgroundColor={"grey"}>
          <Image
            borderRadius="$5"
            resizeMode="cover"
            alignSelf="center"
            opacity={0.5}
            // @ts-ignore
            source={{
              width: "100%",
              height: "100%",
              uri: events.pics,
            }}
          />
        </Card.Background>
      </Card>
    </XStack>
  );
};
