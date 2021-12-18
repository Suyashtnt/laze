import { $fetch } from 'ohmyfetch';

import { httpClasses } from './Internal';

type Constructor = { new (...args: any[]): any };

export const RestClient = (basePath: string) =>
  function <T extends Constructor>(baseClass: T): T {
    return class extends baseClass {
      constructor(...args: any[]) {
        super(args);

        const methods = httpClasses.get(baseClass.name);
        if (!methods)
          throw new Error(
            `Class ${baseClass.name} is not a REST API. Define HTTP methods first.`
          );

        for (const method of methods) {
          this[method.function.name] = function () {
            return $fetch(`${basePath}${method.path}`, {
              method: method.method,
              headers: {
                'Content-Type': 'application/json',
              },
              parseResponse: (response) => JSON.parse(response),
            });
          };
        }
      }
    };
  };
