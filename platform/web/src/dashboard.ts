import type { ActivityFeedViewModel, ChatTurn, PortfolioSnapshot, TradePreviewViewModel } from "./contracts";
import { describeActivityFeed, describePortfolio, describeTradePreview } from "./view-models";

export interface ButrDashboardModel {
  portfolioSummary: string;
  activitySummary: string;
  latestTradePreview?: string;
  chatCount: number;
}

export function buildButrDashboardModel(input: {
  portfolio: PortfolioSnapshot;
  activity: ActivityFeedViewModel;
  chat: ChatTurn[];
  latestPreview?: TradePreviewViewModel;
}): ButrDashboardModel {
  return {
    portfolioSummary: describePortfolio(input.portfolio),
    activitySummary: describeActivityFeed(input.activity),
    latestTradePreview: input.latestPreview ? describeTradePreview(input.latestPreview) : undefined,
    chatCount: input.chat.length
  };
}

