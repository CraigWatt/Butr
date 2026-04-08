import type { ApprovalRequest, ExecutionResult, TradePreview } from "@butr/domain";

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

