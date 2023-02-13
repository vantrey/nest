import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionsRepo } from '../../../infrastructure/quiz-questions.repo';
import { InitUpdateQuestionDto } from '../../../domain/question.entity';
import { Result } from '../../../../utils/result';

export class CreateQuestionCommand {
  constructor(public readonly createQuestionDto: InitUpdateQuestionDto) {}
}

@CommandHandler(CreateQuestionCommand)
export class CreateQuestionBySaUseCase implements ICommandHandler<CreateQuestionCommand> {
  constructor(private readonly quizQuestionsRepo: QuizQuestionsRepo) {}

  async execute(command: CreateQuestionCommand): Promise<Result<string>> {
    const newQuestion = this.quizQuestionsRepo.getNewQuestion();
    newQuestion.initialise(command.createQuestionDto);

    const result = await this.quizQuestionsRepo.save(newQuestion);

    return Result.Success(result.id);
  }
}
