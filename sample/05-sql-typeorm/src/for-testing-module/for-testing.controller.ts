import { Controller, Delete, HttpCode } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CLEAR_ALL_DATA_QUERY_FOR_TESTING } from './clear-all-data-query';

@Controller('testing')
export class ForTestingController {
  constructor(private dataSource: DataSource) {}

  @Delete('all-data')
  @HttpCode(204)
  async deleteAll(): Promise<void> {
    await this.dataSource.query(CLEAR_ALL_DATA_QUERY_FOR_TESTING);
    return;
  }
}
