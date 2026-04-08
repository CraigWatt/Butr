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
  "executionMode": "manual_ticket",
  "liveExecutionEnabled": false,
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

### 4. Approve preview

`POST /approvals/:id/approve`

Response includes an approved `approvalRequest` and an `executionTicket`.

```json
{
  "approvalRequest": {
    "id": "approval_123",
    "status": "approved"
  },
  "executionTicket": {
    "id": "ticket_123",
    "mode": "manual_ticket",
    "status": "ready",
    "summary": "BUY 0.983607 MSFT for approximately 300.00 GBP."
  }
}
```

### 5. List execution tickets

`GET /execution-tickets`

## Notes for AI clients

- Butr is not the chat UI.
- AI clients should convert user intent into structured JSON.
- Butr is responsible for portfolio state, validation, preview, approval gating, and execution readiness.
- The website is marketing only.
