import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../domain/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizQuestionsRepo {
  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
  ) {}

  async save(question: Question): Promise<Question> {
    return this.questionRepository.save(question);
  }

  getNewQuestion(): Question {
    return new Question();
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.questionRepository.findOneBy({ id });
  }
}
