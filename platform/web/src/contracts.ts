import type { AccountSummary, ApprovalRequest, ExecutionResult, Order, Position, TradePreview } from "@butr/domain";

export interface ChatTurn {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface PortfolioSnapshot {
  account: AccountSummary;
  positions: Position[];
  orders: Order[];
}

export interface PortfolioViewModel {
  account: AccountSummary;
  recentOrdersCount: number;
  positionsCount: number;
}

export interface TradePreviewViewModel {
  preview: TradePreview;
  approvalRequest: ApprovalRequest;
}

export interface ActivityFeedViewModel {
  approvals: ApprovalRequest[];
  executions: ExecutionResult[];
  audits: AuditEventViewModel[];
}

export interface AuditEventViewModel {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}
