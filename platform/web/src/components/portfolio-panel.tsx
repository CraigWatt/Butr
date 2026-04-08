import type { PortfolioSnapshot } from "../contracts";
import { describePortfolio } from "../view-models";

export interface PortfolioPanelProps {
  portfolio: PortfolioSnapshot;
}

export function PortfolioPanel(_props: PortfolioPanelProps) {
  return {
    summary: describePortfolio(_props.portfolio),
    positions: _props.portfolio.positions.map((position) => ({
      ticker: position.ticker,
      weight: position.weight,
      value: position.marketValue.amount
    }))
  };
}
