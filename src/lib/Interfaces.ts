export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface Request {
  readonly path: string;
  readonly method: HTTPMethod;
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly function: Function;
}
