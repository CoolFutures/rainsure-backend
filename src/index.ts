import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { v1Routes } from "./routes/v1/index.js";

async function buildServer() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: config.corsOrigin,
  });

  await app.register(healthRoutes);
  await app.register(v1Routes, { prefix: config.apiPrefix });

  return app;
}

buildServer()
  .then((app) =>
    app.listen({ port: config.port, host: "0.0.0.0" }),
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Contribution check by patricia-m at 2025-03-02T13:29:26

// Contribution check by thomas-g at 2025-05-28T22:08:11

// Contribution check by emilyw at 2025-08-24T06:46:57

// Contribution check by joseph-a at 2025-11-19T15:25:42

// Contribution check by sarahcoder at 2026-02-15T00:04:28

// Contribution check by charles-l at 2026-05-13T08:43:13

// patch: 2026-05-27T01:17:08.571430

// patch: 2026-05-28T08:08:34.285716

// patch: 2026-06-03T03:00:00.000003

// patch: 2026-06-04T09:51:25.714289

// patch: 2026-06-18T13:17:08.571435

// patch: 2026-06-19T20:08:34.285721

// patch: 2026-06-24T23:34:17.142865

// patch: 2026-06-26T21:51:25.714294
