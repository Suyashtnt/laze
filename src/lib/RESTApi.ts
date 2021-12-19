import { $fetch } from 'ohmyfetch';

import type { Request } from './Interfaces';
import { httpClassesMetaKey } from './Interfaces';

type Constructor = { new(...args: any[]): any };

export const RestClient = (basePath: string) =>
  function <T extends Constructor>(baseClass: T): T {
    return class extends baseClass {
      constructor(...args: any[]) {
        super(args);

        const methods: Request[] = Reflect.getMetadata(httpClassesMetaKey, this);
        if (!methods)
          throw new Error(
            `Class ${baseClass.name} is not a REST API. Define HTTP methods first.`
          );


        for (const method of methods) {
          const bodyIndex = method.argumentIndexes.body;

          this[method.function] = function(...methodArgs: any[]) {
            const params = new URLSearchParams(Array.from(method.argumentIndexes.query)
              .map(([ index, key ]) => [ key, methodArgs[ index ] ]))

            let path = `${basePath}${method.path}?${params}`;

            for (const entry of method.argumentIndexes.path.entries()) {
              const [index, pathName] = entry;
              // jank? yes. works? yes. better solution? probably
              path = path.replaceAll(`:${pathName}`, methodArgs[index]);
            }

            return $fetch(path, {
              method: method.method,
              headers: Object.fromEntries(method.headers),
              body: bodyIndex ? methodArgs[bodyIndex] : undefined,
            });
          };
        }
      }
    };
  };
