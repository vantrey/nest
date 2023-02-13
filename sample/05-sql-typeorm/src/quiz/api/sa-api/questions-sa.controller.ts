import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateQuestionInputDto,
  PublishQuestionInputDto,
  UpdateQuestionInputDto,
} from './input-dto/crud-question.input-dto';
import { QuestionViewDto } from './view-dto/question.view-dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateQuestionCommand } from '../../application/use-cases/questions/create-question-by-sa.use-case';
import { UuidParameterIdDTO } from '../../../common-dto/id-parameter.dto';
import { DeleteQuestionCommand } from '../../application/use-cases/questions/delete-question-by-sa.use-case';
import { UpdateQuestionCommand } from '../../application/use-cases/questions/update-question-by-sa.use-case';
import { PublishQuestionCommand } from '../../application/use-cases/questions/publish-question-by-sa-use.case';
import { Paginated } from '../../../common-dto/paginated-view';
import { GetQuestionsQueryParams } from './input-dto/get-questions-query-params';
import { QuizQuestionsQueryRepo } from './quiz-questions.query-repo';
import { Result, ResultCode } from '../../../utils/result';
import {
  handleResultOrThrowError,
  handleResultOrThrowHttpException,
} from '../../../utils/handle-result';
import { BasicAuthGuard } from '../../../guards/basic-auth.guard';

@Controller('sa/quiz/questions')
@UseGuards(BasicAuthGuard)
export class QuestionsSaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly questionQueryRepo: QuizQuestionsQueryRepo,
  ) {}

  @Post()
  @HttpCode(201)
  async createQuestion(@Body() dto: CreateQuestionInputDto): Promise<QuestionViewDto> {
    const result = await this.commandBus.execute<CreateQuestionCommand, Result<string>>(
      new CreateQuestionCommand(dto),
    );

    const questionResult = await this.questionQueryRepo.getQuestionById(result.data);

    return handleResultOrThrowError(questionResult).data;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteQuestion(@Param() param: UuidParameterIdDTO): Promise<void> {
    const result = await this.commandBus.execute<DeleteQuestionCommand, Result<null>>(
      new DeleteQuestionCommand(param.id),
    );

    handleResultOrThrowHttpException(result);

    return;
  }

  @Put(':id')
  @HttpCode(204)
  async updateQuestion(
    @Param() param: UuidParameterIdDTO,
    @Body() dto: UpdateQuestionInputDto,
  ): Promise<QuestionViewDto> {
    const result = await this.commandBus.execute<UpdateQuestionCommand, Result<null>>(
      new UpdateQuestionCommand(dto, param.id),
    );

    handleResultOrThrowHttpException(result);

    const questionResult = await this.questionQueryRepo.getQuestionById(param.id);

    return handleResultOrThrowError(questionResult).data;
  }

  @Put(':id/publish')
  @HttpCode(204)
  async publishQuestion(
    @Param() param: UuidParameterIdDTO,
    @Body() dto: PublishQuestionInputDto,
  ): Promise<void> {
    const result = await this.commandBus.execute<PublishQuestionCommand, Result<null>>(
      new PublishQuestionCommand(dto.published, param.id),
    );

    handleResultOrThrowHttpException(result);

    return;
  }

  @Get()
  @HttpCode(200)
  async getQuestions(
    @Query() query: GetQuestionsQueryParams,
  ): Promise<Paginated<QuestionViewDto[]>> {
    const result = await this.questionQueryRepo.getQuestions(query);

    return result.data;
  }
}
