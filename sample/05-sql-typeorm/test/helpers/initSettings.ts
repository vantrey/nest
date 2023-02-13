import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { CLEAR_ALL_DATA_QUERY_FOR_TESTING } from '../../src/for-testing-module/clear-all-data-query';

export const initSettings = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  const dataSource = await app.resolve(DataSource);
  await dataSource.query(CLEAR_ALL_DATA_QUERY_FOR_TESTING);

  return app;
};
