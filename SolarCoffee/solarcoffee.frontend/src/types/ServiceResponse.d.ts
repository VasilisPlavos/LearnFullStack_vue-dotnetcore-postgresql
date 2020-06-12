export default class IServiceResponse<T> {
  IsSuccess: boolean;
  Message: string;
  Time: Date;
  Data: T
}