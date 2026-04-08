import type { TradeIntent } from "@butr/domain";
import { evaluateTrade } from "@butr/rules-engine";
import { approveExecution, createApprovalRequest, createManualExecutionTicket } from "@butr/execution";
import { explainTradePreview, parseIntentText } from "@butr/llm";
import { createTrading212Adapter } from "./broker";
import { createButrRepository } from "./repository-factory";
import type { Trading212Connection } from "./repository";

const repository = createButrRepository();

export function saveTrading212Connection(input: { apiKey: string; apiSecret: string }): Trading212Connection {
  const connection: Trading212Connection = {
    apiKey: input.apiKey,
    apiSecret: input.apiSecret,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  repository.saveTrading212Connection(connection);
  repository.recordAuditEvent("connection_saved", "Trading 212 connection saved.");
  return connection;
}

export function getTrading212ConnectionStatus() {
  return {
    connected: Boolean(repository.getTrading212Connection()),
    executionMode: "manual_ticket" as const,
    liveExecutionEnabled: false,
    accountType: "stocks_and_shares_isa" as const,
    broker: "trading212" as const
  };
}

export async function getPortfolioSnapshot(mode: "paper" | "live" = "paper") {
  const adapter = createTrading212Adapter(mode, repository.getTrading212Connection());
  const account = await adapter.getAccountSummary();
  const positions = await adapter.listPositions();
  const orders = await adapter.listOrders();
  return { account, positions, orders };
}

export async function previewTradeIntent(intent: TradeIntent) {
  const adapter = createTrading212Adapter(intent.mode, repository.getTrading212Connection());
  const account = await adapter.getAccountSummary();
  const preview = await adapter.previewTrade(intent);
  const positions = await adapter.listPositions();
  const evaluation = evaluateTrade({
    account,
    positions,
    intent,
    estimatedQuantity: preview.estimatedQuantity,
    estimatedNotional: preview.estimatedNotional
  });

  const approvalRequest = createApprovalRequest({
    ...preview,
    ruleChecks: evaluation.ruleChecks,
    warnings: evaluation.warnings,
    requiresApproval: evaluation.requiresApproval
  });
  repository.saveTradePreview({
    ...preview,
    ruleChecks: evaluation.ruleChecks,
    warnings: evaluation.warnings,
    requiresApproval: evaluation.requiresApproval
  });
  repository.saveApprovalRequest(approvalRequest);
  repository.recordAuditEvent("preview_created", `Created preview for ${preview.side} ${preview.ticker}.`);
  repository.recordAuditEvent("approval_created", `Created approval request for preview ${preview.id}.`);

  return { preview, approvalRequest };
}

export async function demo() {
  const snapshot = await getPortfolioSnapshot();
  return snapshot;
}

export async function handleChatMessage(input: {
  accountId: string;
  mode: "paper" | "live";
  broker: "trading212";
  sourceText: string;
}) {
  repository.recordAuditEvent("chat_received", `Chat received: ${input.sourceText}`);
  const parsed = parseIntentText(input);

  if (parsed.kind === "portfolio-question") {
    const snapshot = await getPortfolioSnapshot(input.mode);
    return {
      reply: "I can help with portfolio questions and trade previews.",
      snapshot
    };
  }

  const { preview, approvalRequest } = await previewTradeIntent({
    ...parsed.intent,
    mode: input.mode
  });
  return {
    reply: explainTradePreview(preview),
    preview,
    approvalRequest
  };
}

export async function previewStructuredTradeIntent(intent: TradeIntent) {
  return previewTradeIntent(intent);
}

export async function approveTrade(approvalRequestId: string) {
  const approvalRequest = repository.getApprovalRequest(approvalRequestId);
  if (!approvalRequest) {
    throw new Error(`Approval request not found: ${approvalRequestId}`);
  }

  const approvedRequest = approveExecution(approvalRequest);
  repository.saveApprovalRequest(approvedRequest);
  const preview = repository.getTradePreview(approvedRequest.tradePreviewId);
  if (!preview) {
    throw new Error(`Trade preview not found: ${approvedRequest.tradePreviewId}`);
  }

  const executionTicket = createManualExecutionTicket(preview, approvedRequest);
  repository.saveExecutionTicket(executionTicket);
  repository.recordAuditEvent("approval_decided", `Approved request ${approvedRequest.id}.`);
  repository.recordAuditEvent("execution_ticket_created", `Created execution ticket ${executionTicket.id}.`);

  return {
    approvalRequest: approvedRequest,
    executionTicket,
    preview
  };
}

export function getButrActivityFeed() {
  return {
    previews: repository.listTradePreviews(),
    approvals: repository.listApprovalRequests(),
    executionTickets: repository.listExecutionTickets(),
    executions: repository.listExecutionResults(),
    audits: repository.listAuditEvents()
  };
}

export function listTradePreviews() {
  return repository.listTradePreviews();
}

export function listExecutionTickets() {
  return repository.listExecutionTickets();
}
