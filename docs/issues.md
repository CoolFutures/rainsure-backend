# Backend Issues Backlog

## Issue: Implement oracle adapter interface and fallback logic
**Labels:** `enhancement`, `integrations`
**Description:** Develop a robust adapter to fetch climate data from trusted oracles (e.g., decentralized weather stations) and push it to the contracts.
**Acceptance Criteria:**
- Fetches data reliably from primary and secondary oracle sources.
- Fallback mechanism triggers an alert if both sources are down.

## Issue: Add webhook listener for off-chain partner systems
**Labels:** `feature`, `api`
**Description:** Build webhooks so partner MFIs can receive real-time notifications about policy issuance, claims, and payouts.
**Acceptance Criteria:**
- Webhook registration endpoint.
- HMAC signatures for secure payload delivery.
- Retries on failed delivery.

## Issue: Build stress-test simulation scripts
**Labels:** `testing`, `risk`
**Description:** Create scripts to simulate massive, correlated climate events (e.g., regional drought) to test pool solvency limits.
**Acceptance Criteria:**
- Script simulates 10k+ concurrent triggers.
- Generates a report on capital depletion and reserve utilization.

// patch: 2026-05-30T06:25:42.857145

// patch: 2026-06-02T11:34:17.142860
