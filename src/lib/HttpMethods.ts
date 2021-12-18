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

export const GET = (path: string) => generateHttpRequest(path, HTTPMethod.GET);
export const POST = (path: string) =>
  generateHttpRequest(path, HTTPMethod.POST);
export const PATCH = (path: string) =>
  generateHttpRequest(path, HTTPMethod.PATCH);
export const PUT = (path: string) => generateHttpRequest(path, HTTPMethod.PUT);
export const DELETE = (path: string) =>
  generateHttpRequest(path, HTTPMethod.DELETE);
