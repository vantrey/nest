import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionsRepo } from '../../../infrastructure/quiz-questions.repo';
import { InitUpdateQuestionDto } from '../../../domain/question.entity';
import { Result } from '../../../../utils/result';

export class PublishQuestionCommand {
  constructor(public readonly isPublished: boolean, public readonly id: string) {}
}

@CommandHandler(PublishQuestionCommand)
export class PublishQuestionBySaUseCase implements ICommandHandler<PublishQuestionCommand> {
  constructor(private readonly quizQuestionsRepo: QuizQuestionsRepo) {}

  async execute(command: PublishQuestionCommand): Promise<Result<null>> {
    const question = await this.quizQuestionsRepo.getQuestionById(command.id);

    if (!question) {
      return Result.NotFound();
    }

    question.setPublish(command.isPublished);
    await this.quizQuestionsRepo.save(question);

    return Result.Success(null);
  }
}
