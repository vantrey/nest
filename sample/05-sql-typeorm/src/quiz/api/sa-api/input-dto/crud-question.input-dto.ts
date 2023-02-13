import { ArrayNotEmpty, IsArray, IsBoolean, IsString, Length } from 'class-validator';

export class CreateQuestionInputDto {
  @IsString()
  @Length(3, 500)
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
