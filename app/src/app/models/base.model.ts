export class ResponseBase<T> {
  statusCode: number;
  message: string;
  data: T;
}
