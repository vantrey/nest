import { Module } from '@nestjs/common';
import { UploadController } from './api/blogger-api/upload.controller';
import { StorageAdapter } from './application/adapters/storage.adapter';

@Module({
  imports: [],
  providers: [StorageAdapter],
  controllers: [UploadController],
})
export class UploadModule {}
