import { AnswerQuiz } from "./answerQuiz";
import { CheckpointData } from "./checkpointData";
import { Events } from "./events";

export interface UserEventByEventId {
  dataEvents: {
    UserId: number | null;
    EventId: number | null;
    point: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    User: {
      id: number | null;
      name: string | null;
      gender: string | null;
      birthDate: string | null;
      email: string | null;
      phoneNumber: string | null;
      address: string | null;
      ktpId: string | null;
      createdAt: string | null;
      updatedAt: string | null;
    };
    Event: Events;
  };
  checkpointData: CheckpointData[];
  answerQuizData: AnswerQuiz[];
  leaderboard: object | null;
}
