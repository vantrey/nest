import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionsRepo } from '../../../infrastructure/quiz-questions.repo';
import { Result } from '../../../../utils/result';

export class DeleteQuestionCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteQuestionCommand)
export class DeleteQuestionBySaUseCase implements ICommandHandler<DeleteQuestionCommand> {
  constructor(private readonly quizQuestionsRepo: QuizQuestionsRepo) {}

  async execute(command: DeleteQuestionCommand): Promise<Result<null>> {
    const question = await this.quizQuestionsRepo.getQuestionById(command.id);

    if (!question) {
      return Result.NotFound();
    }

    question.delete();
    await this.quizQuestionsRepo.save(question);

    return Result.Success(null);
  }
}
