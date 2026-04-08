import type { TradePreview } from "@butr/domain";

export function explainTradePreview(preview: TradePreview): string {
  const amount = preview.estimatedNotional.amount.toLocaleString("en-GB", {
    style: "currency",
    currency: preview.estimatedNotional.currency
  });
  return `Preview ready for ${preview.side} ${preview.ticker}: estimated ${preview.estimatedQuantity} units for ${amount}.`;
}

