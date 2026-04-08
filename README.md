# Butr

Butr is an AI-native investing copilot for UK retail investors, starting with Trading 212 and ISA-aware portfolio control.

This repo is intentionally designed around a calm, approval-first control layer rather than autonomous trading.
The working tree is organized around four high-level buckets: `infra`, `services`, `platform`, and `tests`.

## Initial product shape

- Web-first chat interface
- Deterministic backend control layer
- Broker adapter abstraction
- Explicit approval before execution
- Portfolio state, rules, previews, and audit logs as first-class domain concepts

## Recommended repo structure

```text
.
├── infra                   # Deploy, env, and infrastructure definitions
├── services                # Backend product services
├── platform                # Shared web app, packages, and product shell
└── tests                   # Cross-cutting integration and end-to-end tests
```

## Core architectural principle

The backend is the source of truth. The LLM can interpret intent and explain results, but it never owns portfolio state or execution decisions.

## Suggested MVP boundaries

- Trading 212 first
- ISA-aware portfolio workflows
- Read portfolio state, generate trade previews, require approval, then execute
- No autonomous strategies
- No multi-broker support yet
- No broad financial planning

For the initial system design, see [docs/butr-mvp-architecture.md](docs/butr-mvp-architecture.md).
