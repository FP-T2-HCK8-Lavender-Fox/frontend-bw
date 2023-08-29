import { View, Text, Button } from "tamagui";
import React from "react";
import IsLoading from "../../../components/IsLoading";
import { useAppDispatch } from "../../../stores/store";
import { pushUserAnswer } from "../../../stores/reducers/eventReducer";

export default function QuizSection({ navigation, route }: any) {
  const { quiz, checkpointNum } = route.params;
  const checkpointId = quiz.CheckpointId;

  const dispatch = useAppDispatch();

  const question = [quiz.trueAnswer, quiz.wrongAnswerOne, quiz.wrongAnswerTwo];

  function shuffle(arr: Array<string>) {
    let currentIndex = arr.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  }

  const fixQuestion = shuffle(question);

  const submitAnswer = (answer: string) => {
    const answerData = { answer: answer, checkpointId: checkpointId };
    dispatch(pushUserAnswer(answerData))
      .then(() => {
        return navigation.navigate("DetailMyEvent", {
          id: quiz.EventId,
        });
      })
      .catch((err) => console.log(err));
  };

  if (!fixQuestion) {
    return <IsLoading />;
  }
  return (
    <View padding={20} alignItems="center" flex={1}>
      <Text
        textAlign="center"
        fontSize={23}
        fontWeight={"500"}
        marginTop={20}
        marginBottom={2}
      >
        Checkpoint {checkpointNum}
      </Text>
      <Text fontWeight={"400"} fontSize={17} marginVertical={2}>
        {quiz.question}
      </Text>
      <Button
        marginVertical={2}
        backgroundColor={"#E35335"}
        onPress={() => submitAnswer(fixQuestion[0])}
      >
        <Text
          // @ts-ignore
          fontFamily={"Coolvetica"}
          color={"white"}
          minWidth={300}
        >
          A. {fixQuestion[0]}
        </Text>
      </Button>
      <Button
        marginVertical={2}
        backgroundColor={"#E35335"}
        onPress={() => submitAnswer(fixQuestion[1])}
      >
        <Text
          // @ts-ignore
          fontFamily={"Coolvetica"}
          color={"white"}
          minWidth={300}
        >
          B. {fixQuestion[1]}
        </Text>
      </Button>
      <Button
        marginVertical={2}
        backgroundColor={"#E35335"}
        onPress={() => submitAnswer(fixQuestion[2])}
      >
        <Text
          // @ts-ignore
          fontFamily={"Coolvetica"}
          color={"white"}
          minWidth={300}
        >
          C. {fixQuestion[2]}
        </Text>
      </Button>
    </View>
  );
}
