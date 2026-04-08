import type { ChatTurn, TradePreviewViewModel } from "./contracts";

export function createUserTurn(content: string): ChatTurn {
  return {
    id: `turn_${Date.now()}`,
    role: "user",
    content,
    createdAt: new Date().toISOString()
  };
}

export function createAssistantTurn(content: string): ChatTurn {
  return {
    id: `turn_${Date.now()}`,
    role: "assistant",
    content,
    createdAt: new Date().toISOString()
  };
}

export function summarizeTradePreview(viewModel: TradePreviewViewModel): string {
  const { preview } = viewModel;
  return `${preview.side.toUpperCase()} ${preview.ticker} for ${preview.estimatedNotional.currency} ${preview.estimatedNotional.amount.toFixed(2)} requires approval.`;
}

