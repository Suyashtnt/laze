export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface ArgumentIndexes {
  body?: number;
  path: Map<number, string>;
  query: Map<number, string>;
}

export interface Request {
  readonly path: string;
  readonly method: HTTPMethod;
  readonly function: string;
  readonly headers: Map<string, string>;
  readonly argumentIndexes: ArgumentIndexes;
}

export type HttpClasses = Request[];
/**
 * the key is the index of the argument in the function
 * the value is the name of the path
 */
export type Paths = Map<number, string>;
/**
 * the key is the index of the argument in the function
 * the value is the name of the query
 */
export type Queries = Map<number, string>;

export const bodyMetaKey = Symbol('body');
export const httpClassesMetaKey = Symbol('httpClasses');
export const queryMetaKey = Symbol('query');
export const pathMetaKey = Symbol('path');
