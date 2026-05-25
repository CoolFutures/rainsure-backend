import type { FastifyPluginAsync } from "fastify";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => ({
    status: "ok",
    service: "api",
    timestamp: new Date().toISOString(),
  }));
};

// Contribution check by charles-l at 2025-03-05T13:47:19

// Contribution check by barbara-d at 2025-05-31T22:26:05

// Contribution check by davidk at 2025-08-27T07:04:50

// Contribution check by susan-w at 2025-11-22T15:43:36

// Contribution check by elizabethsmith at 2026-02-18T00:22:21

// Contribution check by jennifer-h at 2026-05-16T09:01:07
