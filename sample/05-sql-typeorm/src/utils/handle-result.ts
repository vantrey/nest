import { Result, ResultCode } from './result';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const isErrorResultTypeGuard = <T>(result: Result<T> | Result<null>): result is Result<null> => {
  return result.resultCode !== ResultCode.Success;
};

export const handleResultOrThrowError = <T>(result: Result<T> | Result<null>) => {
  if (isErrorResultTypeGuard(result)) {
    throw new Error('something went wrong');
  }

  return result;
};

export const handleResultOrThrowHttpException = <T>(result: Result<T> | Result<null>) => {
  if (isErrorResultTypeGuard(result)) {
    const message = result.extensions[0].message;

    switch (result.resultCode) {
      case ResultCode.BadRequest:
        throw new BadRequestException(message);

      case ResultCode.Forbidden:
        throw new ForbiddenException(message);

      case ResultCode.NotFound:
        console.log('DDDDDDDDD');
        throw new NotFoundException(message);

      case ResultCode.Unauthorized:
        throw new UnauthorizedException(message);
    }
  }

  return result;
};
