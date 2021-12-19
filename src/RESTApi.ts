// deno-lint-ignore-file no-explicit-any
import { $fetch } from "https://cdn.skypack.dev/ohmyfetch@v0.4.11?dts";
import { compile } from "https://cdn.skypack.dev/path-to-regexp@6.2.0?dts";

import type { Request } from "./Interfaces.ts";
import { httpClassesMetaKey } from "./Interfaces.ts";
import "https://deno.land/x/reflection@0.0.2/mod.ts";

type Constructor = { new (...args: any[]): any };

export const RestClient = (basePath: string) =>
  function <T extends Constructor>(baseClass: T): T {
    return class extends baseClass {
      constructor(...args: any[]) {
        super(args);

        const methods: Request[] | undefined = Reflect.getMetadata(
          httpClassesMetaKey,
          this,
        );
        if (!methods) {
          throw new Error(
            `Class ${baseClass.name} is not a REST API. Define HTTP methods first.`,
          );
        }

        for (const method of methods) {
          const bodyIndex = method.argumentIndexes.body;

          this[method.function] = function (...methodArgs: any[]) {
            const mapToEntry = (
              [index, key]: [number, string],
            ) => [key, methodArgs[index]];

            const params = new URLSearchParams(
              Array.from(method.argumentIndexes.query).map(mapToEntry),
            );

            const compiledPath = compile(method.path)(
              Object.fromEntries(
                Array.from(method.argumentIndexes.path.entries())
                  .map(mapToEntry),
              ),
            );

            return $fetch(`${basePath}${compiledPath}?${params}`, {
              method: method.method,
              headers: Object.fromEntries(method.headers),
              body: bodyIndex ? methodArgs[bodyIndex] : undefined,
            });
          };
        }
      }
    };
  };
