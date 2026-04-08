import { butrRepository } from "./store";

export type RepositoryBackend = "memory" | "postgres";

export function getRepositoryBackend(): RepositoryBackend {
  return process.env.BUTR_REPOSITORY_BACKEND === "postgres" ? "postgres" : "memory";
}

export function createButrRepository() {
  const backend = getRepositoryBackend();
  if (backend === "memory") {
    return butrRepository;
  }

  throw new Error("Postgres repository backend is not wired yet.");
}

