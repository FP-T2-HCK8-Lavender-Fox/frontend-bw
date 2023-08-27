import { Button, Card, Image, Paragraph, Text, XStack } from "tamagui";
import React from "react";
import { Events } from "../models/events";

export const EventsCard = ({
  events,
  navigation,
}: {
  events: Events;
  navigation: any;
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
      >
        <Card.Header padded>
          <Text
            textShadowColor={"rgba(0, 0, 0, 0.75)"}
            textShadowOffset={{ width: -1, height: 1 }}
            textShadowRadius={10}
            fontSize={24}
            fontWeight={"600"}
            color={"white"}
          >
            {events.name}
          </Text>
          <Text
            textShadowColor={"rgba(0, 0, 0, 0.75)"}
            textShadowOffset={{ width: -1, height: 1 }}
            textShadowRadius={10}
            fontSize={12}
            color={"white"}
          >
            <Text fontWeight={"bold"} color={"white"} fontSize={16}>
              Start :
            </Text>{" "}
            {new Date(events.startDate).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
          <Text
            textShadowColor={"rgba(0, 0, 0, 0.75)"}
            textShadowOffset={{ width: -1, height: 1 }}
            textShadowRadius={10}
            fontSize={12}
            color={"white"}
          >
            <Text fontWeight={"bold"} color={"white"} fontSize={16}>
              End :
            </Text>{" "}
            {new Date(events.endDate).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
          <Paragraph
            textShadowColor={"rgba(0, 0, 0, 0.75)"}
            textShadowOffset={{ width: -1, height: 1 }}
            textShadowRadius={10}
            color={"white"}
          >
            {events.description}
          </Paragraph>
        </Card.Header>
        <Card.Footer>
          <XStack flex={1} />
          <Button
            onPress={() =>
              navigation.navigate("DetailHomePage", {
                id: events.id,
              })
            }
            position="absolute"
            right={20}
            bottom={20}
            borderRadius="$10"
            backgroundColor={"#E35335"}
            color="white"
          >
            Details
          </Button>
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
