export enum ResultCode {
  Success,
  Error,
  NotFound,
  BadRequest,
  Forbidden,
  Unauthorized,
}

export class Extension {
  src?: string | null;
  message: string;

  public static get(data: Extension): Extension {
    const extension = new Extension();
    extension.message = data.message;
    extension.src = typeof data.src === 'string' ? data.src : null;

    return extension;
  }
}

const isExtensions = (
  messageOrExtensions?: string | Extension[],
): messageOrExtensions is Extension[] => {
  return (
    Array.isArray(messageOrExtensions) &&
    messageOrExtensions.length > 0 &&
    messageOrExtensions.every(value => value instanceof Extension)
  );
};

export class Result<T> {
  resultCode: ResultCode;
  data: T;
  extensions: Extension[];

  public static Success<T>(data: T, messageOrExtensions?: string | Extension[]): Result<T> {
    const extensions = Result.getDefaultExtensions('success', messageOrExtensions);

    const result = new Result<T>();
    result.resultCode = ResultCode.Success;
    result.data = data;
    result.extensions = extensions;

    return result;
  }

  public static Error(
    resultCode: ResultCode,
    messageOrExtensions?: string | Extension[],
  ): Result<null> {
    const extensions = this.getDefaultExtensions('some error', messageOrExtensions);

    const result = new Result<null>();
    result.data = null;
    result.resultCode = resultCode || ResultCode.Error;
    result.extensions = extensions;

    return result;
  }

  private static getDefaultExtensions(
    defaultMessage: string,
    messageOrExtensions?: string | Extension[],
  ): Extension[] {
    let extensions: Extension[] = [Extension.get({ message: defaultMessage })];

    if (isExtensions(messageOrExtensions)) {
      extensions = messageOrExtensions;
    }

    if (typeof messageOrExtensions === 'string') {
      extensions = [Extension.get({ message: messageOrExtensions })];
    }

    return extensions;
  }

  public static NotFound(messageOrExtensions?: string | Extension[]): Result<null> {
    return Result.Error(ResultCode.NotFound, messageOrExtensions || 'not found');
  }

  public static BadRequest(messageOrExtensions?: string | Extension[]): Result<null> {
    return Result.Error(ResultCode.BadRequest, messageOrExtensions || 'bad request');
  }

  public static Forbidden(messageOrExtensions?: string | Extension[]): Result<null> {
    return Result.Error(ResultCode.Forbidden, messageOrExtensions || 'forbidden');
  }

  public static Unauthorized(messageOrExtensions?: string | Extension[]): Result<null> {
    return Result.Error(ResultCode.Unauthorized, messageOrExtensions || 'unauthorized');
  }

  public static AppError(messageOrExtensions?: string | Extension[]): Result<null> {
    return Result.Error(ResultCode.Error, messageOrExtensions || 'something went wrong');
  }
}
