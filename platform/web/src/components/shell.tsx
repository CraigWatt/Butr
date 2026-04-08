import type { ChatTurn, PortfolioSnapshot } from "../contracts";
import { describePortfolio } from "../view-models";

export interface ButrShellProps {
  portfolio: PortfolioSnapshot;
  chat: ChatTurn[];
  activityCount: number;
}

export function ButrShell(_props: ButrShellProps) {
  return {
    portfolioSummary: describePortfolio(_props.portfolio),
    activitySummary: `${_props.activityCount} activity items`,
    turns: _props.chat.length
  };
}
