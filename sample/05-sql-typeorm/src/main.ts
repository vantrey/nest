import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addGlobalPipeToApp } from './utils/main-settings';
import { AllExceptionsFilter } from './utils/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter(false));
  addGlobalPipeToApp(app);

  await app.listen(5005);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
