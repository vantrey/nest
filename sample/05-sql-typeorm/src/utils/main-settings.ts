import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { errorFormatter } from './error-formatter';

export const addGlobalPipeToApp = app => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: errors => {
        const messages = errorFormatter(errors);

        throw new BadRequestException(messages);
      },
    }),
  );
};
