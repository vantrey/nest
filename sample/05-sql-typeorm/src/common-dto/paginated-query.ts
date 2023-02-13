import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

enum SortDirectionQuery {
  Asc = 'asc',
  Desc = 'desc',
}

export class PaginatedFilter {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  pageNumber: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number = 10;
}

export class PaginatedFilterWithDefaultSorting extends PaginatedFilter {
  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  @IsEnum(SortDirectionQuery)
  sortDirection: SortDirectionQuery = SortDirectionQuery.Desc;
}
