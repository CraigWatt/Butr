import type { AccountSummary, MoneyValue, Position, RuleCheck, TradeIntent, TradePreview } from "@butr/domain";
import { assertIsaOnlyAccount, validateTradeIntent } from "@butr/domain";

export interface TradeEvaluationInput {
  account: AccountSummary;
  positions: Position[];
  intent: TradeIntent;
  estimatedQuantity: number;
  estimatedNotional: MoneyValue;
}

export function evaluateTrade(input: TradeEvaluationInput): Pick<TradePreview, "ruleChecks" | "warnings" | "requiresApproval"> {
  assertIsaOnlyAccount(input.account);
  validateTradeIntent(input.intent);

  const ruleChecks: RuleCheck[] = [
    {
      code: "isa-only",
      passed: input.account.accountType === "stocks_and_shares_isa",
      message: "Only Stocks & Shares ISA accounts are supported."
    },
    {
      code: "cash-available",
      passed: input.intent.side === "sell" || input.account.cash.amount >= input.estimatedNotional.amount,
      message: "Buy orders must be covered by available cash."
    },
    {
      code: "position-known",
      passed: input.positions.some((position) => position.ticker.toUpperCase() === input.intent.ticker.toUpperCase()) || input.intent.side === "buy",
      message: "Existing position found or buy intent accepted as a new holding."
    }
  ];

  const warnings: string[] = [];
  if (input.intent.mode === "paper") {
    warnings.push("This is a paper-mode preview.");
  }
  if (input.estimatedQuantity <= 0) {
    warnings.push("Estimated quantity is very small or zero.");
  }
  const targetPosition = input.positions.find((position) => position.ticker.toUpperCase() === input.intent.ticker.toUpperCase());
  if (targetPosition && targetPosition.weight >= 0.2 && input.intent.side === "buy") {
    warnings.push(`You already have ${Math.round(targetPosition.weight * 100)}% in ${targetPosition.ticker}.`);
  }

  return {
    ruleChecks,
    warnings,
    requiresApproval: true
  };
}
