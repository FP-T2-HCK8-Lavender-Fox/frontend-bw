import { AnswerQuiz } from "./answerQuiz";
import { CheckpointData } from "./checkpointData";
import { Events } from "./events";
import { Users } from "./users";

export interface UserEventByEventId {
  dataEvents: {
    UserId: number | null;
    EventId: number | null;
    point: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    User: Users;
    Event: Events;
  };
  checkpointData: CheckpointData[];
  answerQuizData: AnswerQuiz[];
  leaderboard: object | null;
}
