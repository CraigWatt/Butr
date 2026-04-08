# Postgres

Butr's durable state should eventually live in Postgres.

Planned tables:

- `users`
- `waitlist_signups`
- `trading212_connections`
- `trade_previews`
- `approval_requests`
- `execution_tickets`
- `execution_results`
- `audit_events`
- `portfolio_snapshots`
- `broker_accounts`

Important note:

- Trading 212 credentials should be stored encrypted at rest with key rotation support.
