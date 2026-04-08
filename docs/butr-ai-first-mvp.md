# Butr AI-First MVP

Butr v1 is an API-first Trading 212 control layer.

## Product shape

- Website: marketing only
- API: real product surface
- User-owned AI client: optional front end
- Trading 212 connection: stored in Butr
- Execution: approval-first
- Scope: Stocks & Shares ISA only

## User flow

1. The user connects their Trading 212 API key and secret to Butr.
2. The user asks their preferred AI chat client to do something like:
   - "Can I buy £300 of Microsoft in my ISA?"
   - "What am I overweight in?"
   - "Show me the trade preview."
3. The AI client converts the request into a structured trade intent and sends it to Butr.
4. Butr checks portfolio state, applies rules, and returns a preview.
5. The user approves the trade.
6. Butr submits the order through Trading 212.

## MVP endpoints

- `GET /status`
- `POST /setup/trading212`
- `POST /trade-intents/preview`
- `POST /approvals/:id/approve`
- `GET /portfolio`
- `GET /activity`

## Non-goals

- bespoke in-product chat UI
- social or mirror trading
- multi-broker support
- autonomous strategies
- broad financial planning

## Website direction

The public site should stay simple:

- logo
- one-line value proposition
- API-first explanation
- Trading 212 setup note
- no demo trading UI
- no fake portfolio cards

