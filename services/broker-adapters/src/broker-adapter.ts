import type { AccountSummary, Instrument, Order, Position, TradeIntent, TradePreview } from "@butr/domain";

export interface BrokerAdapter {
  readonly broker: "trading212";
  getAccountSummary(): Promise<AccountSummary>;
  listPositions(): Promise<Position[]>;
  listOrders(): Promise<Order[]>;
  searchInstrument(ticker: string): Promise<Instrument | null>;
  previewTrade(intent: TradeIntent): Promise<TradePreview>;
}

