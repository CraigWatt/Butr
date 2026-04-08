import { MockTrading212Adapter, Trading212Adapter } from "@butr/broker-adapters";

export function createTrading212Adapter(mode: "paper" | "live") {
  if (mode === "paper") {
    return new MockTrading212Adapter("paper");
  }

  const apiKey = process.env.TRADING212_API_KEY;
  const apiSecret = process.env.TRADING212_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Trading 212 credentials are required for live mode.");
  }

  return new Trading212Adapter(mode, { apiKey, apiSecret });
}

