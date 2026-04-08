import type { AccountSummary, Instrument, Order, Position, TradeIntent, TradePreview } from "@butr/domain";
import { assertIsaOnlyAccount, validateTradeIntent } from "@butr/domain";
import type { BrokerAdapter } from "../broker-adapter";
import { calculateNotional, calculateQuantityFromCash, calculateQuantityFromWeight } from "@butr/rules-engine";

const mockAccount: AccountSummary = {
  id: "acct_demo_1",
  broker: "trading212",
  mode: "paper",
  accountType: "stocks_and_shares_isa",
  currency: "GBP",
  accountNumber: "ISA-001",
  cash: { amount: 10000, currency: "GBP" },
  marketValue: { amount: 25000, currency: "GBP" },
  investedValue: { amount: 23500, currency: "GBP" },
  totalValue: { amount: 35000, currency: "GBP" },
  updatedAt: new Date().toISOString(),
};

const mockPositions: Position[] = [
  {
    ticker: "MSFT",
    quantity: 12.5,
    instrumentValue: { amount: 3812.5, currency: "GBP" },
    averagePrice: { amount: 290, currency: "GBP" },
    marketPrice: { amount: 305, currency: "GBP" },
    marketValue: { amount: 3812.5, currency: "GBP" },
    weight: 0.109,
    unrealizedPnl: { amount: 187.5, currency: "GBP" }
  }
];

const mockOrders: Order[] = [];

const mockInstruments: Instrument[] = [
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    isin: "US5949181045",
    assetClass: "equity",
    exchange: "NASDAQ",
    currency: "GBP",
    tradable: true
  }
];

export class MockTrading212Adapter implements BrokerAdapter {
  readonly broker = "trading212" as const;
  constructor(private readonly mode: "paper" | "live" = "paper") {}

  async getAccountSummary(): Promise<AccountSummary> {
    assertIsaOnlyAccount(mockAccount);
    return {
      ...mockAccount,
      mode: this.mode
    };
  }

  async listPositions(): Promise<Position[]> {
    return mockPositions;
  }

  async listOrders(): Promise<Order[]> {
    return mockOrders;
  }

  async searchInstrument(ticker: string): Promise<Instrument | null> {
    const normalized = ticker.trim().toUpperCase();
    return (
      mockInstruments.find((instrument) => instrument.ticker === normalized) ??
      mockInstruments.find((instrument) => instrument.name.toUpperCase().includes(normalized)) ??
      null
    );
  }

  async previewTrade(intent: TradeIntent): Promise<TradePreview> {
    validateTradeIntent(intent);
    const instrument = await this.searchInstrument(intent.ticker);
    if (!instrument) {
      throw new Error(`Unknown instrument: ${intent.ticker}`);
    }

    const pricePerUnit = { amount: 305, currency: mockAccount.currency };

    const quantity =
      intent.target.kind === "quantity"
        ? intent.target.quantity
        : intent.target.kind === "cash"
          ? calculateQuantityFromCash(intent.target.amount, pricePerUnit)
          : calculateQuantityFromWeight(intent.target.targetWeight, mockAccount.totalValue, pricePerUnit);
    const notional = calculateNotional(quantity, pricePerUnit);

    return {
      id: `preview_${Date.now()}`,
      tradeIntentId: intent.id,
      accountId: intent.accountId,
      mode: intent.mode,
      broker: intent.broker,
      ticker: instrument.ticker,
      side: intent.side,
      estimatedPricePerUnit: pricePerUnit,
      estimatedQuantity: Number(quantity.toFixed(6)),
      estimatedNotional: notional,
      estimatedFees: { amount: 0, currency: mockAccount.currency },
      estimatedTotalImpact: {
        amount: Number((notional.amount + 0).toFixed(2)),
        currency: mockAccount.currency
      },
      ruleChecks: [
        {
          code: "isa-only",
          passed: true,
          message: "Account is an ISA."
        }
      ],
      warnings: [
        ...(intent.mode === "paper" ? ["Paper mode only. No real funds will be used."] : []),
        ...(intent.mode === "live" ? ["Live mode enabled. Real execution will require approval."] : [])
      ],
      requiresApproval: true,
      createdAt: new Date().toISOString()
    };
  }
}
