import type { OperatingMode } from "@butr/domain";
import { assertModeIsValid } from "@butr/domain";

export interface ButrRuntimeConfig {
  mode: OperatingMode;
  broker: "trading212";
  accountType: "stocks_and_shares_isa";
}

export function getDefaultRuntimeConfig(): ButrRuntimeConfig {
  const rawMode = process.env.BUTR_MODE ?? "paper";
  assertModeIsValid(rawMode);
  return {
    mode: rawMode,
    broker: "trading212",
    accountType: "stocks_and_shares_isa"
  };
}
