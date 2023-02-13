export class QuestionViewDto {
  body: string;
  correctAnswers: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  id: string;
}
