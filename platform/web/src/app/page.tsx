import type { ActivityFeedViewModel, ChatTurn, PortfolioSnapshot, TradePreviewViewModel } from "../contracts";
import { buildButrDashboardModel } from "../dashboard";

export interface ButrAppProps {
  portfolio: PortfolioSnapshot;
  activity: ActivityFeedViewModel;
  chat: ChatTurn[];
  latestPreview?: TradePreviewViewModel;
}

export function ButrApp(props: ButrAppProps) {
  return buildButrDashboardModel(props);
}
