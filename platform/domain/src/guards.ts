import type { AccountSummary, TradeIntent } from "./types";

export function assertIsaOnlyAccount(account: AccountSummary): void {
  if (account.accountType !== "stocks_and_shares_isa") {
    throw new Error("Butr currently supports Stocks & Shares ISA only.");
  }
}

export function assertModeIsValid(mode: string): asserts mode is "paper" | "live" {
  if (mode !== "paper" && mode !== "live") {
    throw new Error(`Invalid operating mode: ${mode}`);
  }
}

export function normalizeWeight(value: number): number {
  if (!Number.isFinite(value)) {
    throw new Error("Weight must be a finite number.");
  }
  return Math.max(0, Math.min(1, value));
}

export function validateTradeIntent(intent: TradeIntent): void {
  if (!intent.ticker.trim()) {
    throw new Error("Trade intent must include a ticker.");
  }
  if (intent.target.kind === "quantity" && intent.target.quantity === 0) {
    throw new Error("Quantity target cannot be zero.");
  }
  if (intent.target.kind === "cash" && intent.target.amount.amount <= 0) {
    throw new Error("Cash target must be greater than zero.");
  }
  if (intent.target.kind === "weight" && (intent.target.targetWeight <= 0 || intent.target.targetWeight > 1)) {
    throw new Error("Target weight must be between 0 and 1.");
  }
}
