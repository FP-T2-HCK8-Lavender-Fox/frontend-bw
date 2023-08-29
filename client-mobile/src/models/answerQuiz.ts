export interface AnswerQuiz {
  id: number | null;
  trueOrFalse: boolean | null;
  UserId: number | null;
  CheckpointId: number;
  createdAt: string | null;
  updatedAt: string | null;
}
