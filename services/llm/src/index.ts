import type { BrokerName, OperatingMode, TradeIntent } from "@butr/domain";
export * from "./explain";

export type ParsedIntent =
  | {
      kind: "trade";
      intent: TradeIntent;
    }
  | {
      kind: "portfolio-question";
      sourceText: string;
    };

export function parseIntentText(input: {
  sourceText: string;
  accountId: string;
  mode: OperatingMode;
  broker: BrokerName;
}): ParsedIntent {
  const text = input.sourceText.trim();
  const direction = /\bsell\b/i.test(text) ? "sell" : /\bbuy\b/i.test(text) ? "buy" : null;
  const cashMatch = /£(?<cash>\d+(?:\.\d{1,2})?)/i.exec(text);
  const weightMatch = /(?<weight>\d+(?:\.\d+)?)%/i.exec(text);
  const assetMatch =
    /(?:buy|sell)(?:\s+£\d+(?:\.\d{1,2})?)?(?:\s+of)?\s+(?<asset>[a-zA-Z0-9 .&-]+?)(?:\s+(?:in|with|using|for)\b|$)/i.exec(text) ??
    /(?:buy|sell)\s+(?<asset>[a-zA-Z0-9 .&-]+)$/i.exec(text);

  if (!direction || !assetMatch?.groups?.asset) {
    return {
      kind: "portfolio-question",
      sourceText: text
    };
  }

  const side = direction as "buy" | "sell";
  const ticker = assetMatch.groups.asset.trim();
  const cashAmount = cashMatch?.groups?.cash ? Number(cashMatch.groups.cash) : null;
  const weight = weightMatch?.groups?.weight ? Number(weightMatch.groups.weight) / 100 : null;

  const target =
    cashAmount !== null
      ? { kind: "cash" as const, amount: { amount: cashAmount, currency: "GBP" } }
      : weight !== null
        ? { kind: "weight" as const, targetWeight: weight }
        : { kind: "quantity" as const, quantity: 1 };

  return {
    kind: "trade",
    intent: {
      id: `intent_${Date.now()}`,
      accountId: input.accountId,
      mode: input.mode,
      broker: input.broker,
      side,
      ticker,
      target,
      sourceText: text,
      createdAt: new Date().toISOString()
    }
  };
}
