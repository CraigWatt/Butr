import { createButrHttpServer } from "./http";
import { getDefaultRuntimeConfig } from "./config";

const port = Number(process.env.PORT ?? 3000);
const runtime = getDefaultRuntimeConfig();

createButrHttpServer().listen(port, () => {
  // The first runnable API entrypoint for Butr.
  console.log(`Butr API listening on http://localhost:${port} in ${runtime.mode} mode`);
});
