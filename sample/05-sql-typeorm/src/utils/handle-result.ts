import { Result, ResultCode } from './result';

const isErrorResultTypeGuard = (result: Result<any> | Result<null>): result is Result<null> => {
  return true;
};

export const isSuccessOrThrow500 = <T>(result: Result<T>) => {
  if (isErrorResultTypeGuard(result)) {
    throw new Error('something went wrong');
  }
};
