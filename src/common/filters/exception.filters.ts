import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse =
      exception instanceof BadRequestException
        ? exception.getResponse()['message']
        : null;

    let message = exception.message ?? 'Internal Server Error';

    if (exceptionResponse != null) {
      Array.isArray(exceptionResponse)
        ? (message = exceptionResponse[0])
        : (message = exceptionResponse);
    }
    const prodErrorResponse: any = {
      statusCode,
      message,
    };
    response.status(statusCode).json(prodErrorResponse);
  }
}
