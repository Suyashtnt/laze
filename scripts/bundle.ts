import * as esbuild from "https://deno.land/x/esbuild@v0.14.5/mod.js";

function byteCount(s: string) {
  return encodeURI(s).split(/%..|./).length - 1;
}

const bundled = await Deno.emit("./mod.ts", {
  bundle: "module",
});
const result = await esbuild.transform(bundled.files["deno:///bundle.js"], {
  loader: "ts",
  logLevel: "warning",
  minify: true,
  format: "esm",
});

Deno.mkdir("builds/web", { recursive: true });

await Deno.writeTextFile("builds/web/bundle.js", result.code, {
  create: true,
});

console.log(
  `A web-compatible build has been made! size: ${
    byteCount(result.code) / 1000
  }kb`,
);

esbuild.stop();
