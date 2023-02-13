import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './domain/question.entity';
import { QuestionsSaController } from './api/sa-api/questions-sa.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateQuestionBySaUseCase } from './application/use-cases/questions/create-question-by-sa.use-case';
import { QuizQuestionsRepo } from './infrastructure/quiz-questions.repo';
import { PublishQuestionBySaUseCase } from './application/use-cases/questions/publish-question-by-sa-use.case';
import { DeleteQuestionBySaUseCase } from './application/use-cases/questions/delete-question-by-sa.use-case';
import { UpdateQuestionBySaUseCase } from './application/use-cases/questions/update-question-by-sa.use-case';
import { QuizQuestionsQueryRepo } from './api/sa-api/quiz-questions.query-repo';

const commandHandlers = [
  PublishQuestionBySaUseCase,
  CreateQuestionBySaUseCase,
  DeleteQuestionBySaUseCase,
  UpdateQuestionBySaUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([Question]), CqrsModule],
  providers: [...commandHandlers, QuizQuestionsRepo, QuizQuestionsQueryRepo],
  controllers: [QuestionsSaController],
})
export class QuizModule {}
