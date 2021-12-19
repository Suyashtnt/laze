import { build } from "https://deno.land/x/dnt@0.8.0/mod.ts";

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./builds/npm",
  package: {
    name: "laze-rest",
    version: Deno.args[0],
    description: "A REST API client for Deno, node, and the browser",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/suyashtnt/laze.git",
    },
    bugs: {
      url: "https://github.com/suyashtnt/laze/issues",
    },
    sideEffects: false,
  },
  mappings: {
    "https://deno.land/x/reflection@0.0.2/mod.ts": {
      name: "reflect-metadata",
      version: "0.1.13",
    },
  },
});

Deno.copyFileSync("LICENSE", "builds/npm/LICENSE");
Deno.copyFileSync("README.md", "builds/npm/README.md");
