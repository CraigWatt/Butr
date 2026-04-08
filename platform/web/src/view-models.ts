import type { ActivityFeedViewModel, PortfolioSnapshot, TradePreviewViewModel } from "./contracts";

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export function describePortfolio(snapshot: PortfolioSnapshot): string {
  const positions = snapshot.positions.length;
  const orders = snapshot.orders.length;
  return `${snapshot.account.accountType.toUpperCase()} · ${positions} positions · ${orders} orders · cash ${formatMoney(snapshot.account.cash.amount, snapshot.account.currency)}`;
}

export function describeTradePreview(viewModel: TradePreviewViewModel): string {
  const { preview } = viewModel;
  return `${preview.side.toUpperCase()} ${preview.ticker} for ${formatMoney(preview.estimatedNotional.amount, preview.estimatedNotional.currency)} requires approval.`;
}

export function describeActivityFeed(activity: ActivityFeedViewModel): string {
  return `${activity.previews.length} previews · ${activity.approvals.length} approvals · ${activity.executions.length} executions · ${activity.audits.length} audit events`;
}

