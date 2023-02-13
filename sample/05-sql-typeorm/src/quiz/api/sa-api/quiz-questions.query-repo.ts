import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../domain/question.entity';
import { FindOperator, Like, Repository } from 'typeorm';
import { Paginated } from '../../../common-dto/paginated-view';
import { QuestionViewDto } from './view-dto/question.view-dto';
import {
  GetQuestionsQueryParams,
  PublishStatusQueryEnum,
} from './input-dto/get-questions-query-params';
import { getSkipPage } from '../../../utils/get-skip-page';
import { Result } from '../../../utils/result';

@Injectable()
export class QuizQuestionsQueryRepo {
  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
  ) {}

  async getQuestions(query: GetQuestionsQueryParams): Promise<Paginated<QuestionViewDto[]>> {
    const { bodySearchTerm, publishedStatus, sortDirection, sortBy, pageNumber, pageSize } = query;
    const filter: { body?: FindOperator<string>; published?: boolean; isDeleted: boolean } = {
      isDeleted: false,
    };

    if (publishedStatus !== PublishStatusQueryEnum.All) {
      filter.published = publishedStatus === PublishStatusQueryEnum.Published;
    }

    if (bodySearchTerm) {
      filter.body = Like(`%${query.bodySearchTerm}%`);
    }

    const [result, total] = await this.questionRepository.findAndCount({
      where: filter,
      take: pageSize,
      skip: getSkipPage(pageNumber, pageSize),
      order: { [sortBy]: sortDirection.toUpperCase() },
    });

    return Paginated.getPaginated<QuestionViewDto[]>({
      page: pageNumber,
      size: pageSize,
      count: total,
      items: result.map(question => ({
        body: question.body,
        createdAt: question.createdAt,
        published: question.published,
        updatedAt: question.updatedAt || null,
        correctAnswers: question.correctAnswers,
        id: question.id,
      })),
    });
  }

  async getQuestionById(id: string): Promise<Result<QuestionViewDto> | Result<null>> {
    const result = await this.questionRepository.findOneBy({ id, isDeleted: false });

    if (!result) {
      return Result.NotFound();
    }

    return Result.Success<QuestionViewDto>({
      body: result.body,
      createdAt: result.createdAt,
      published: result.published,
      updatedAt: result.updatedAt || null,
      correctAnswers: result.correctAnswers,
      id: result.id,
    });
  }
}
