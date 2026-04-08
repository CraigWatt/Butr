# Butr API Contract

Butr is intended to be driven by external AI clients.

## Core flow

### 1. Connect Trading 212

`POST /setup/trading212`

Request:

```json
{
  "apiKey": "string",
  "apiSecret": "string"
}
```

Response:

```json
{
  "connected": true,
  "createdAt": "2026-04-09T12:00:00.000Z",
  "updatedAt": "2026-04-09T12:00:00.000Z"
}
```

### 2. Check status

`GET /status`

Response:

```json
{
  "connected": true,
  "accountType": "stocks_and_shares_isa",
  "broker": "trading212"
}
```

### 3. Preview a trade intent

`POST /trade-intents/preview`

Request:

```json
{
  "id": "intent_123",
  "accountId": "acct_123",
  "mode": "paper",
  "broker": "trading212",
  "side": "buy",
  "ticker": "MSFT",
  "target": {
    "kind": "cash",
    "amount": {
      "amount": 300,
      "currency": "GBP"
    }
  },
  "sourceText": "Buy £300 of Microsoft in my ISA",
  "createdAt": "2026-04-09T12:00:00.000Z"
}
```

Response includes a `preview` and `approvalRequest`.

### 4. Approve execution

`POST /approvals/:id/approve`

## Notes for AI clients

- Butr is not the chat UI.
- AI clients should convert user intent into structured JSON.
- Butr is responsible for portfolio state, validation, preview, approval gating, and execution.
- The website is marketing only.

