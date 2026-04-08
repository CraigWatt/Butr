# Butr

Butr is an AI-native investing control layer for UK retail investors, starting with Trading 212 and ISA-aware portfolio workflows.

This repo is intentionally designed around a calm, approval-first control layer rather than autonomous trading.
The working tree is organized around four high-level buckets: `infra`, `services`, `platform`, and `tests`.
Butr v1 is Stocks & Shares ISA only, with an explicit `paper` vs `live` operating mode.
For the AI-first MVP, the website is marketing-only and the API is the product surface. See [docs/butr-ai-first-mvp.md](docs/butr-ai-first-mvp.md).

## Initial product shape

- Marketing-only website
- API-first control layer for external AI clients
- Deterministic portfolio checks and trade previews
- Approval objects and manual execution tickets
- Portfolio state, rules, previews, approvals, and audit logs as first-class domain concepts

## Recommended repo structure

```text
.
├── infra                   # Deploy, env, and infrastructure definitions
├── platform                # Shared domain, web, and product shell
├── services                # Backend product services
└── tests                   # Cross-cutting integration and end-to-end tests
```

## Core architectural principle

The backend is the source of truth. The LLM can interpret intent and explain results, but it never owns portfolio state or execution decisions.

## Suggested MVP boundaries

- Trading 212 first
- ISA-aware portfolio workflows
- Read portfolio state, generate trade previews, require approval, then issue execution-ready tickets
- No autonomous strategies
- No public live execution path in v1
- No multi-broker support yet
- No broad financial planning

For the initial system design, see [docs/butr-mvp-architecture.md](docs/butr-mvp-architecture.md).
For the frontend and brand direction, see [platform/web/DESIGN.md](platform/web/DESIGN.md) and [docs/butr-brand.md](docs/butr-brand.md).
For the AI client contract, see [docs/butr-api.md](docs/butr-api.md).
For a practical privacy/security launch checklist, see [docs/butr-privacy-security-checklist.md](docs/butr-privacy-security-checklist.md).
