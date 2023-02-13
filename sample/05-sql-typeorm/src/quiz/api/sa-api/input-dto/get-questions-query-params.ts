import { PaginatedFilterWithDefaultSorting } from '../../../../common-dto/paginated-query';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum PublishStatusQueryEnum {
  All = 'all',
  Published = 'published',
  NotPublished = 'notPublished',
}

export class GetQuestionsQueryParams extends PaginatedFilterWithDefaultSorting {
  @IsOptional()
  @IsString()
  bodySearchTerm: string;

  @IsOptional()
  @IsEnum(PublishStatusQueryEnum)
  publishedStatus: PublishStatusQueryEnum = PublishStatusQueryEnum.All;
}
