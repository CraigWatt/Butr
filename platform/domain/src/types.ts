export type OperatingMode = "paper" | "live";

export type BrokerName = "trading212";

export type AccountType = "stocks_and_shares_isa";

export type OrderSide = "buy" | "sell";

export type OrderType = "market";

export type OrderStatus =
  | "draft"
  | "pending"
  | "filled"
  | "partially_filled"
  | "cancelled"
  | "rejected";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired";

export type ExecutionMode = "manual_ticket" | "broker_submit";

export type AssetClass = "equity" | "etf" | "fund" | "cash" | "other";

export interface MoneyValue {
  amount: number;
  currency: string;
}

export interface AccountSummary {
  id: string;
  broker: BrokerName;
  mode: OperatingMode;
  accountType: AccountType;
  currency: string;
  accountNumber?: string;
  cash: MoneyValue;
  marketValue: MoneyValue;
  investedValue: MoneyValue;
  totalValue: MoneyValue;
  updatedAt: string;
}

export interface Instrument {
  ticker: string;
  name: string;
  isin?: string;
  assetClass: AssetClass;
  exchange?: string;
  currency: string;
  tradable: boolean;
}

export interface Position {
  ticker: string;
  quantity: number;
  instrumentValue?: MoneyValue;
  averagePrice: MoneyValue;
  marketPrice: MoneyValue;
  marketValue: MoneyValue;
  weight: number;
  unrealizedPnl: MoneyValue;
}

export interface Order {
  id: string;
  ticker: string;
  side: OrderSide;
  type: OrderType;
  status: OrderStatus;
  quantity: number;
  filledQuantity: number;
  limitPrice?: MoneyValue;
  submittedAt: string;
  updatedAt: string;
}

export type TradeIntentTarget =
  | {
      kind: "cash";
      amount: MoneyValue;
    }
  | {
      kind: "quantity";
      quantity: number;
    }
  | {
      kind: "weight";
      targetWeight: number;
    };

export interface TradeIntent {
  id: string;
  accountId: string;
  mode: OperatingMode;
  broker: BrokerName;
  side: OrderSide;
  ticker: string;
  target: TradeIntentTarget;
  strategySource?: string;
  sourceText: string;
  createdAt: string;
}

export interface RuleCheck {
  code: string;
  passed: boolean;
  message: string;
}

export interface TradePreview {
  id: string;
  tradeIntentId: string;
  accountId: string;
  mode: OperatingMode;
  broker: BrokerName;
  ticker: string;
  side: OrderSide;
  estimatedPricePerUnit: MoneyValue;
  estimatedQuantity: number;
  estimatedNotional: MoneyValue;
  estimatedFees: MoneyValue;
  estimatedTotalImpact: MoneyValue;
  ruleChecks: RuleCheck[];
  warnings: string[];
  requiresApproval: boolean;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  tradePreviewId: string;
  status: ApprovalStatus;
  requestedAt: string;
  decidedAt?: string;
  decidedBy?: string;
}

export interface ExecutionTicket {
  id: string;
  approvalRequestId: string;
  tradePreviewId: string;
  mode: ExecutionMode;
  status: "ready" | "used" | "cancelled";
  summary: string;
  instructions: string[];
  createdAt: string;
}

export interface ExecutionResult {
  id: string;
  approvalRequestId: string;
  status: "submitted" | "failed" | "cancelled";
  brokerOrderId?: string;
  executedQuantity?: number;
  executedNotional?: MoneyValue;
  submittedAt: string;
  finishedAt?: string;
  errorMessage?: string;
}
