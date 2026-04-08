import type { ApprovalRequest, ExecutionResult, ExecutionTicket, TradePreview } from "@butr/domain";

export function createApprovalRequest(preview: TradePreview): ApprovalRequest {
  return {
    id: `approval_${Date.now()}`,
    tradePreviewId: preview.id,
    status: "pending",
    requestedAt: new Date().toISOString()
  };
}

export function approveExecution(request: ApprovalRequest): ApprovalRequest {
  return {
    ...request,
    status: "approved",
    decidedAt: new Date().toISOString(),
    decidedBy: "user"
  };
}

export function createManualExecutionTicket(preview: TradePreview, approvalRequest: ApprovalRequest): ExecutionTicket {
  return {
    id: `ticket_${Date.now()}`,
    approvalRequestId: approvalRequest.id,
    tradePreviewId: preview.id,
    mode: "manual_ticket",
    status: "ready",
    summary: `${preview.side.toUpperCase()} ${preview.estimatedQuantity} ${preview.ticker} for approximately ${preview.estimatedNotional.amount.toFixed(2)} ${preview.estimatedNotional.currency}.`,
    instructions: [
      "Review the trade preview and rule checks in Butr.",
      `Open Trading 212 and prepare a ${preview.side} market order for ${preview.ticker}.`,
      `Use an estimated quantity of ${preview.estimatedQuantity}.`,
      "Confirm the latest market price and account cash before submitting.",
      "Record the final broker order details back into Butr once execution support is enabled."
    ],
    createdAt: new Date().toISOString()
  };
}

export function buildExecutionResult(approvalRequestId: string, brokerOrderId?: string): ExecutionResult {
  return {
    id: `exec_${Date.now()}`,
    approvalRequestId,
    status: brokerOrderId ? "submitted" : "failed",
    brokerOrderId,
    submittedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString()
  };
}
