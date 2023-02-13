import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForTestingController } from './for-testing.controller';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [ForTestingController],
})
export class ForTestingModule {}
