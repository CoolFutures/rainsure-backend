# RainSure — Backend API (Stellar / Soroban integration)

Insurance distribution and oracle-fed payouts need secure automation—this API connects policies, pools, and external risk data to Soroban without exposing custodial keys client-side.

---

## 🎯 What is this service?

RainSure separates **product definition** (`policy-factory`), **capital** (`risk-pool`), and **payout execution** (`payout-engine`) on-chain. Insurers, MFIs, and agtech partners interact through **this** backend: enrollment files, premium collection confirmations, oracle payload ingestion, solvency reporting jobs, and controlled payout triggers after independent measurement validation.

---

## ❓ Problems the **protocol** solves (whole repo)

These come from the [root README](../../README.md) — shared context for why Stellar/Soroban exists here:

- Traditional claims are slow and administratively heavy—ill-suited to **high-frequency** climate stress.
- Small ticket policies need **scale**; manual adjustment does not scale.
- Donors and insurers need **auditable** triggers and solvency visibility.

---

## 🛠️ Problems **this API** solves specifically

The smart contracts hold **truth on-chain**; they cannot safely hold ERP passwords, IoT vendor keys, bulk files, or cron jobs. That is this service’s job:

- **Oracle ingestion**: Weather/index feeds arrive via signed webhooks—must terminate TLS server-side.
- **Partner batch files**: Enrollment CSVs from cooperatives should never be uploaded purely via static hosting.
- **Regulatory reporting**: Pool metrics exports for reinsurers—computed server-side.
- **Idempotent payouts**: Prevent duplicate disbursement POSTs when networks flap.

---

## ✅ Protocol goals this backend helps achieve

- Issue policies from templates tuned to **crop, region, and season**.
- Pool capital with **solvency guardrails** visible to participants.
- Execute payouts when **oracle/index conditions** pass—minimizing dispute surface.
- Integrate **partner** distribution (MFIs, agtech, governments).

---

## 💡 Capabilities this backend enables (production roadmap)

- **Enrollment ingestion**: Validate members vs KYC rules before on-chain enrollment txs.
- **Oracle adapter**: Normalize provider payloads → payout-engine proofs.
- **Solvency jobs**: Scheduled stress snapshots pulling risk-pool state.
- **Partner auth**: mTLS or signed requests from insurer cores.

---

## 🔗 Soroban crates → API responsibilities

| Crate | What the HTTP layer typically does |
| ----- | ---------------------------------- |
| `policy-factory` | Issue/update policy SKUs from actuarial tables; map SKUs to contract parameters safely. |
| `risk-pool` | Deposit/withdraw orchestration with treasury approvals; surface NAV-style metrics. |
| `payout-engine` | Trigger payouts after oracle quorum; record execution receipts for disputes. |

---

## 🏗️ Architecture & stack

| Layer | Choice |
| ----- | ------ |
| HTTP framework | **Fastify** 5 — low overhead, schema-friendly |
| Language | **TypeScript** (strict, ESM, `verbatimModuleSyntax`) |
| Config | **Zod** parsing in `src/config/env.ts` |
| Blockchain | **Stellar** Horizon + **Soroban** RPC (server-side keys only) |
| Consumers | [`frontend`](../frontend/README.md), partner systems, cron workers |

---

## 📁 Package layout

```
backend/
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts              # Fastify bootstrap, CORS, route registration
    ├── config/env.ts         # Typed environment
    └── routes/
        ├── health.ts         # GET /health
        └── v1/index.ts       # Versioned API surface (expand here)
```

---

## 🚀 Quick start

### Prerequisites

- **Node.js** 20.x or **22.x** (LTS)
- npm (or pnpm/yarn per org standard)

### Install & run

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — see tables below
npm run dev
```

Default: **http://localhost:8080** · Health: **GET** `/health` · Meta: **GET** `/api/v1/meta`

### Run with the Next.js frontend

```bash
# Terminal A — API
cd backend && npm run dev

# Terminal B — frontend
cd ../frontend && npm install && npm run dev
```

Set `CORS_ORIGIN` in `.env` to match the web origin (e.g. `http://localhost:3000`).

---

## 📜 Scripts

| Command | Purpose |
| ------- | ------- |
| `npm install` | Install dependencies |
| `npm run dev` | `tsx watch` — reload on change |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled server |
| `npm run lint` | `tsc --noEmit` typecheck |

---

## 🔐 Environment variables

### Baseline (implemented)

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `NODE_ENV` | `development` | Environment name |
| `PORT` | `8080` | Listen port |
| `API_PREFIX` | `/api/v1` | Prefix for versioned routes |
| `CORS_ORIGIN` | `http://localhost:3000` | Browser origin allowed by CORS |

### Production / integration (plan — **do not commit secrets**)

| Variable | Example | Purpose |
| -------- | ------- | ------- |
| `ORACLE_WEBHOOK_SECRET` | (secret) | Verify oracle callbacks. |
| `REINSURER_EXPORT_BUCKET` | s3://… | Scheduled reporting dumps. |
| `SOROBAN_RPC_URL` | `https://…` | Submit payout txs. |

---

## 🔌 HTTP surface

### Implemented (scaffold)

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Liveness for load balancers & CI |
| GET | `/api/v1/meta` | Service name / version |

### Planned themes (domain routes — implement under `src/routes/v1/`)

- `POST /api/v1/enrollments/batch` — validated cohort onboarding.
- `POST /api/v1/oracles/trigger` — ingest signed index payload.
- `GET /api/v1/pools/:id/metrics` — investor/regulator-friendly aggregates.

---

## 🧪 Testing & quality

```bash
npm run lint
```

CI should mirror this (see [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)).

Add **contract integration tests** in the Rust workspace and **API integration tests** (e.g. `vitest` + `supertest`) as routes grow.

---

## 🚢 Deployment notes

- Run behind TLS termination (load balancer or reverse proxy).
- Store signing keys in **KMS/HSM**, never in repo.
- Restrict Soroban RPC by IP allowlist or private gateway when possible.
- Emit structured logs (JSON) with **request IDs** for regulator audits (especially MediProof / CivicLedger / ReliefFlow).

---

## 🤝 Contributing

See [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md). Contract changes must stay aligned with this API’s eventual routes and [`../../docs/SITE_MAP.md`](../../docs/SITE_MAP.md).

---

## 📄 License

Match the repository license (Apache-2.0 suggested for OSS grants — confirm per org).

---

## 📞 Support & related docs

| Doc | Link |
| --- | ---- |
| Monorepo overview | [`../../README.md`](../../README.md) |
| Frontend | [`../frontend/README.md`](../frontend/README.md) |
| Architecture notes | [`../../docs/layout-plan.md`](../../docs/layout-plan.md) |
| Milestones → issues | [`../../docs/milestones-issues.md`](../../docs/milestones-issues.md) |

---

**Package:** `rainsure-api` · **Slug:** `rainsure`

<!-- Contribution check by emilyw at 2025-02-24T12:53:39 -->

<!-- Contribution check by joseph-a at 2025-05-22T21:32:25 -->

<!-- Contribution check by sarahcoder at 2025-08-18T06:11:10 -->

<!-- Contribution check by charles-l at 2025-11-13T14:49:56 -->

<!-- Contribution check by barbara-d at 2026-02-08T23:28:41 -->

<!-- Contribution check by davidk at 2026-05-07T08:07:27 -->

<!-- Gbangbolaoluwagbemiga — 2025-04-04 -->

<!-- anuoluwaponiorimi — 2025-05-21 -->

<!-- Mercy017 — 2025-07-08 -->

<!-- Williams-1604 — 2025-08-24 -->

<!-- codemagician1949 — 2025-10-11 -->
