import { HTTPMethod, Request } from './Interfaces';
import { httpClasses } from './Internal';

function generateHttpRequest(
  path: string,
  method: HTTPMethod
): MethodDecorator {
  return (target, _methodName, propertyDescriptor: PropertyDescriptor) => {
    const existingRequests = httpClasses.get(target.constructor.name);

    if (existingRequests) {
      const newRequest: Request = {
        path,
        function: propertyDescriptor.value,
        method,
      };

      httpClasses.set(target.constructor.name, [
        ...existingRequests,
        newRequest,
      ]);
    } else {
      httpClasses.set(target.constructor.name, [
        {
          path,
          function: propertyDescriptor.value,
          method,
        },
      ]);
    }
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
