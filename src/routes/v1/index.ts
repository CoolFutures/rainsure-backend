import type { FastifyPluginAsync } from "fastify";

export const v1Routes: FastifyPluginAsync = async (app) => {
  app.get("/meta", async () => ({
    name: "rainsure-api",
    version: "0.1.0",
    description: "REST facade for Soroban contracts and indexers (scaffold).",
  }));

  // TODO: routes for contract invocation prep, webhook ingestion, admin ops
};

// Contribution check by jennifer-h at 2025-03-08T14:05:13

// Contribution check by kulayddon at 2025-06-03T22:43:58

// Contribution check by patricia-m at 2025-08-30T07:22:43

// Contribution check by thomas-g at 2025-11-25T16:01:29

// Contribution check by emilyw at 2026-02-21T00:40:14

// Contribution check by joseph-a at 2026-05-19T09:19:00

// Contribution by anuoluwaponiorimi — 2025-03-25

// Contribution by Mercy017 — 2025-05-12
