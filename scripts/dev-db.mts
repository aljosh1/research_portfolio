import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";

// Local-only PostgreSQL (no Docker needed). Data persists in .pgdata/
const dir = ".pgdata";
const pg = new EmbeddedPostgres({
  databaseDir: dir,
  user: "postgres",
  password: "postgres",
  port: 5433,
  persistent: true,
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
});

if (!existsSync(`${dir}/PG_VERSION`)) await pg.initialise();
await pg.start();
try {
  await pg.createDatabase("research_portfolio");
} catch {
  // already exists
}
console.log("PostgreSQL ready on postgresql://postgres:postgres@localhost:5433/research_portfolio");

const stop = async () => {
  await pg.stop();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
setInterval(() => {}, 1 << 30);
