import type { AccountSummary, Instrument, Order, Position, TradeIntent, TradePreview } from "@butr/domain";
import type { BrokerAdapter } from "../broker-adapter";

export interface Trading212Credentials {
  apiKey: string;
  apiSecret: string;
}

export class Trading212Adapter implements BrokerAdapter {
  readonly broker = "trading212" as const;

  constructor(
    private readonly mode: "paper" | "live",
    private readonly credentials: Trading212Credentials
  ) {}

  async getAccountSummary(): Promise<AccountSummary> {
    throw new Error(`Trading 212 adapter not wired yet for ${this.mode} mode.`);
  }

  async listPositions(): Promise<Position[]> {
    throw new Error("Trading 212 adapter not wired yet.");
  }

  async listOrders(): Promise<Order[]> {
    throw new Error("Trading 212 adapter not wired yet.");
  }

  async searchInstrument(_ticker: string): Promise<Instrument | null> {
    throw new Error("Trading 212 adapter not wired yet.");
  }

  async previewTrade(_intent: TradeIntent): Promise<TradePreview> {
    throw new Error("Trading 212 adapter not wired yet.");
  }
}

