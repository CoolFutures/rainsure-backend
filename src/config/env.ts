import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(8080),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const raw = schema.parse(process.env);

export const config = {
  nodeEnv: raw.NODE_ENV,
  port: raw.PORT,
  apiPrefix: raw.API_PREFIX,
  corsOrigin: raw.CORS_ORIGIN,
};

// Contribution check by davidk at 2025-02-27T13:11:33

// Contribution check by susan-w at 2025-05-25T21:50:18

// Contribution check by elizabethsmith at 2025-08-21T06:29:04

// Contribution check by jennifer-h at 2025-11-16T15:07:49

// Contribution check by kulayddon at 2026-02-11T23:46:35

// Contribution check by patricia-m at 2026-05-10T08:25:20

// Contribution by codemagician1949 — 2025-02-25

// Contribution by WIAG1949 — 2025-04-13
