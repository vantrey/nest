import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initSettings } from './helpers/initSettings';
import { CreateQuestionInputDto } from '../src/quiz/api/sa-api/input-dto/crud-question.input-dto';

describe('Questions - /sa/quiz/questions (e2e)', () => {
  const createQuestionBody: CreateQuestionInputDto = {
    body: 'answer',
    correctAnswers: ['correct', 'correct2'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    app = await initSettings();
  });

  it('Create [POST /questions]', () => {
    return request(app.getHttpServer())
      .post('/sa/quiz/questions')
      .send(createQuestionBody)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          ...createQuestionBody,
          published: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: expect.any(String),
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
