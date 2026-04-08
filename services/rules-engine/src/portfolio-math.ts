import type { MoneyValue, Position } from "@butr/domain";

export function roundQuantity(quantity: number): number {
  return Number(quantity.toFixed(6));
}

export function calculateNotional(quantity: number, pricePerUnit: MoneyValue): MoneyValue {
  return {
    amount: Number((quantity * pricePerUnit.amount).toFixed(2)),
    currency: pricePerUnit.currency
  };
}

export function calculateQuantityFromCash(cash: MoneyValue, pricePerUnit: MoneyValue): number {
  if (cash.currency !== pricePerUnit.currency) {
    throw new Error("Currency mismatch for quantity calculation.");
  }
  return roundQuantity(cash.amount / pricePerUnit.amount);
}

export function calculateQuantityFromWeight(
  targetWeight: number,
  portfolioValue: MoneyValue,
  pricePerUnit: MoneyValue
): number {
  if (portfolioValue.currency !== pricePerUnit.currency) {
    throw new Error("Currency mismatch for quantity calculation.");
  }
  return roundQuantity((targetWeight * portfolioValue.amount) / pricePerUnit.amount);
}

export function sumPositionValue(positions: Position[]): MoneyValue {
  const currency = positions[0]?.marketValue.currency ?? "GBP";
  return {
    amount: Number(positions.reduce((total, position) => total + position.marketValue.amount, 0).toFixed(2)),
    currency
  };
}

