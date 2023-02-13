import { ArrayNotEmpty, IsArray, IsBoolean, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionInputDto {
  @IsString()
  @Length(10, 500)
  body: string;

  @IsArray()
  @ArrayNotEmpty()
  correctAnswers: string[];
}

export class UpdateQuestionInputDto extends CreateQuestionInputDto {}

export class PublishQuestionInputDto {
  @IsBoolean()
  published: true;
}
