import {
  bodyMetaKey,
  pathMetaKey,
  Paths,
  Queries,
  queryMetaKey
} from './Interfaces';

export const Body: ParameterDecorator = (target, propertyKey, index) =>
  Reflect.defineMetadata(bodyMetaKey, index, target, propertyKey);

export const Path: (path: string) => ParameterDecorator =
  (path) => (target, propertyKey, index) => {
    const paths: Paths = Reflect.getMetadata(pathMetaKey, target, propertyKey) || new Map();
    paths.set(index, path);
    Reflect.defineMetadata(pathMetaKey, paths, target, propertyKey);
  };

export const Query: (name: string) => ParameterDecorator =
  (name) => (target, propertyKey, index) => {
    const queries: Queries = Reflect.getMetadata(queryMetaKey, target) || new Map();
    queries.set(index, name);
    Reflect.defineMetadata(queryMetaKey, queries, target, propertyKey);
  };
