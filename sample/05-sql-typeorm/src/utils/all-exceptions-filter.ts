import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private isProduction: boolean) {}
  catch(exception: any, host: ArgumentsHost) {
    console.log('timestamp :', new Date().toISOString()); // log all exception
    console.log('EXCEPTION :', exception); // log all exception

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const exceptionResponse = isHttpException ? (exception.getResponse() as ErrorException) : null;
    const message = isHttpException ? exception?.message : exception?.message || 'Some error';
    const errorDescription = Array.isArray(exceptionResponse?.message)
      ? exceptionResponse?.message
      : null;

    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === 500 && this.isProduction) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: 'Some error occurred',
        errorDescription: null,
      });

      return;
    }

    console.log('errorDescription', errorDescription);
    if (status === 400) {
      response.status(status).json({
        errorsMessages: errorDescription,
      });

      return;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorDescription,
    });
  }
}

type ErrorException = {
  statusCode: number;
  message: { message: string; field: string }[];
  error: string;
};
