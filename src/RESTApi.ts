// deno-lint-ignore-file no-explicit-any
import { $fetch } from "https://cdn.skypack.dev/ohmyfetch@v0.4.11?dts";
import { compile } from "https://cdn.skypack.dev/path-to-regexp@6.2.0?dts";

import type { Request } from "./Interfaces.ts";
import { httpClassesMetaKey } from "./Interfaces.ts";
import "https://deno.land/x/reflection@0.0.2/mod.ts";

type Constructor = { new (...args: any[]): any };

interface CustomOptions {
  /**
   * custom headers that will be added to every request, method headers will override existing headers
   * useful for authentication on every request
   * also for APIs that for some bizzare reason don't support JSON
   */
  customHeaders?: Record<string, string>;

  /**
   * Transform your input data before sending it to the server
   * @default ohmyfetch uses JSON.stringify
   */
  inputParser?: (input: any) => string;

  /**
   * Transform your output data before sending it back
   * @default ohmyfetch uses destr, a JSON parser
   * @see https://github.com/unjs/destr
   */
  outputParser?: (output: string) => any;
}

export const RestClient = (basePath: string, opts?: CustomOptions) =>
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

            const inputParser = opts?.inputParser;

            return $fetch(`${basePath}${compiledPath}?${params}`, {
              method: method.method,
              headers: {
                ...opts?.customHeaders,
                ...Object.fromEntries(method.headers),
              },
              body: bodyIndex
                ? (inputParser
                  ? inputParser(methodArgs[bodyIndex])
                  : methodArgs[bodyIndex])
                : undefined,
              parseResponse: opts?.outputParser,
            });
          };
        }
      }
    };
  };
