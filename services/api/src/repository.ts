import type { ApprovalRequest, ExecutionResult, ExecutionTicket, TradePreview } from "@butr/domain";

export interface Trading212Connection {
  apiKey: string;
  apiSecret: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditEvent {
  id: string;
  type:
    | "chat_received"
    | "preview_created"
    | "approval_created"
    | "approval_decided"
    | "execution_recorded"
    | "execution_ticket_created"
    | "connection_saved";
  message: string;
  createdAt: string;
}

export interface ButrRepository {
  saveTrading212Connection(connection: Trading212Connection): void;
  getTrading212Connection(): Trading212Connection | null;
  saveTradePreview(preview: TradePreview): void;
  getTradePreview(previewId: string): TradePreview | null;
  listTradePreviews(): TradePreview[];
  saveApprovalRequest(request: ApprovalRequest): void;
  getApprovalRequest(id: string): ApprovalRequest | null;
  listApprovalRequests(): ApprovalRequest[];
  saveExecutionTicket(ticket: ExecutionTicket): void;
  getExecutionTicket(id: string): ExecutionTicket | null;
  listExecutionTickets(): ExecutionTicket[];
  saveExecutionResult(result: ExecutionResult): void;
  listExecutionResults(): ExecutionResult[];
  recordAuditEvent(type: AuditEvent["type"], message: string): AuditEvent;
  listAuditEvents(): AuditEvent[];
}

class MemoryButrRepository implements ButrRepository {
  private trading212Connection: Trading212Connection | null = null;
  private readonly approvalRequests = new Map<string, ApprovalRequest>();
  private readonly executionTickets = new Map<string, ExecutionTicket>();
  private readonly executionResults = new Map<string, ExecutionResult>();
  private readonly tradePreviews = new Map<string, TradePreview>();
  private readonly auditEvents: AuditEvent[] = [];

  saveTrading212Connection(connection: Trading212Connection): void {
    this.trading212Connection = connection;
  }

  getTrading212Connection(): Trading212Connection | null {
    return this.trading212Connection;
  }

  saveTradePreview(preview: TradePreview): void {
    this.tradePreviews.set(preview.id, preview);
  }

  getTradePreview(previewId: string): TradePreview | null {
    return this.tradePreviews.get(previewId) ?? null;
  }

  listTradePreviews(): TradePreview[] {
    return [...this.tradePreviews.values()];
  }

  saveApprovalRequest(request: ApprovalRequest): void {
    this.approvalRequests.set(request.id, request);
  }

  getApprovalRequest(id: string): ApprovalRequest | null {
    return this.approvalRequests.get(id) ?? null;
  }

  listApprovalRequests(): ApprovalRequest[] {
    return [...this.approvalRequests.values()];
  }

  saveExecutionTicket(ticket: ExecutionTicket): void {
    this.executionTickets.set(ticket.id, ticket);
  }

  getExecutionTicket(id: string): ExecutionTicket | null {
    return this.executionTickets.get(id) ?? null;
  }

  listExecutionTickets(): ExecutionTicket[] {
    return [...this.executionTickets.values()];
  }

  saveExecutionResult(result: ExecutionResult): void {
    this.executionResults.set(result.id, result);
  }

  listExecutionResults(): ExecutionResult[] {
    return [...this.executionResults.values()];
  }

  recordAuditEvent(type: AuditEvent["type"], message: string): AuditEvent {
    const event: AuditEvent = {
      id: `audit_${Date.now()}_${this.auditEvents.length + 1}`,
      type,
      message,
      createdAt: new Date().toISOString()
    };
    this.auditEvents.push(event);
    return event;
  }

  listAuditEvents(): AuditEvent[] {
    return [...this.auditEvents];
  }
}

export const butrRepository: ButrRepository = new MemoryButrRepository();
