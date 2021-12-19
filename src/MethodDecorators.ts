import {
  bodyMetaKey,
  HttpClasses,
  httpClassesMetaKey,
  HTTPMethod,
  pathMetaKey,
  queryMetaKey,
  Request,
} from "./Interfaces.ts";

function generateHttpRequest(
  path: string,
  method: HTTPMethod
): MethodDecorator {
  return (target, methodName, propertyDescriptor: PropertyDescriptor) => {
    // deno-lint-ignore ban-types
    const value = propertyDescriptor.value as Function;

    const existingRequests: HttpClasses =
      Reflect.getOwnMetadata(httpClassesMetaKey, target) || [];

    const newRequest: Request = {
      path,
      function: value.name,
      method,
      headers: new Map(),
      argumentIndexes: {
        body: Reflect.getMetadata(bodyMetaKey, target, methodName),
        path: Reflect.getMetadata(pathMetaKey, target, methodName) || new Map(),
        query:
          Reflect.getMetadata(queryMetaKey, target, methodName) || new Map(),
      },
    };

    existingRequests.push(newRequest);

    Reflect.defineMetadata(httpClassesMetaKey, existingRequests, target);
  };
}

function createMethodHandler(method: HTTPMethod) {
  return (path: string) => generateHttpRequest(path, method);
}

export const GET = createMethodHandler(HTTPMethod.GET);
export const POST = createMethodHandler(HTTPMethod.POST);
export const PATCH = createMethodHandler(HTTPMethod.PATCH);
export const DELETE = createMethodHandler(HTTPMethod.DELETE);
export const PUT = createMethodHandler(HTTPMethod.PUT);

export const Header: (key: string, value: string) => MethodDecorator =
  (key, value) =>
  (target, _methodName, propertyDescriptor: PropertyDescriptor) => {
    const requests: HttpClasses | undefined = Reflect.getOwnMetadata(
      httpClassesMetaKey,
      target
    );
    if (!requests)
      throw new Error(`No requests found for ${target.constructor.name}`);

    // deno-lint-ignore ban-types
    const propertyValue = propertyDescriptor.value as Function;

    const request = requests.find((r) => r.function === propertyValue.name);
    if (!request)
      throw new Error(
        "No request found for this function. " +
          "You need to decorate it with a HTTP method. (@GET, @POST, etc.) " +
          "If you have decorated it with a HTTP method, make sure it is the last decorator in the stack." +
          "\n Read this for more: https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-composition"
      );

    const newRequest = {
      ...request,
      headers: new Map([...request.headers, [key, value]]),
    };
    requests.push(newRequest);
    Reflect.defineMetadata(httpClassesMetaKey, requests, target);
  };
