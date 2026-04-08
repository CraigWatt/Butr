import type { ExecutionResult, TradePreview } from "@butr/domain";

export function buildSubmittedExecutionResult(preview: TradePreview, approvalRequestId: string): ExecutionResult {
  return {
    id: `exec_${Date.now()}`,
    approvalRequestId,
    status: "submitted",
    brokerOrderId: `order_${Date.now()}`,
    executedQuantity: preview.estimatedQuantity,
    executedNotional: preview.estimatedNotional,
    submittedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString()
  };
}
