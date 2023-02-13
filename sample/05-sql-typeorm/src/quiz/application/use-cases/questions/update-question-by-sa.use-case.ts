import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionsRepo } from '../../../infrastructure/quiz-questions.repo';
import { InitUpdateQuestionDto } from '../../../domain/question.entity';
import { Result } from '../../../../utils/result';

export class UpdateQuestionCommand {
  constructor(
    public readonly updateQuestionDto: InitUpdateQuestionDto,
    public readonly id: string,
  ) {}
}

@CommandHandler(UpdateQuestionCommand)
export class UpdateQuestionBySaUseCase implements ICommandHandler<UpdateQuestionCommand> {
  constructor(private readonly quizQuestionsRepo: QuizQuestionsRepo) {}

  async execute(command: UpdateQuestionCommand): Promise<Result<null>> {
    const question = await this.quizQuestionsRepo.getQuestionById(command.id);

    if (!question) {
      return Result.NotFound();
    }

    question.update(command.updateQuestionDto);
    await this.quizQuestionsRepo.save(question);

    return Result.Success(null);
  }
}
