import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { ForTestingModule } from './for-testing-module/for-testing.module';
import { UploadModule } from './upload/upload.module';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ivan',
  password: '123',
  database: 'db_1',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UsersModule,
    QuizModule,
    ForTestingModule,
    UploadModule,
  ],
})
export class AppModule {}
