import type { ExecutionResult } from "@butr/domain";
import type { ActivityFeedViewModel, PortfolioSnapshot, TradePreviewViewModel } from "./contracts";

export interface ButrClient {
  getPortfolio(): Promise<PortfolioSnapshot>;
  sendChatMessage(input: { sourceText: string; mode: "paper" | "live"; accountId: string }): Promise<{
    reply: string;
    preview?: TradePreviewViewModel["preview"];
    approvalRequest?: TradePreviewViewModel["approvalRequest"];
  }>;
  approveTrade(approvalRequestId: string): Promise<{
    preview: TradePreviewViewModel["preview"];
    approvalRequest: TradePreviewViewModel["approvalRequest"];
    executionResult: ExecutionResult;
  }>;
  getActivityFeed(): Promise<ActivityFeedViewModel>;
}

export function createButrClient(baseUrl: string): ButrClient {
  return {
    async getPortfolio() {
      const response = await fetch(`${baseUrl}/portfolio`);
      return response.json();
    },
    async sendChatMessage(input) {
      const response = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });
      return response.json();
    },
    async approveTrade(approvalRequestId: string) {
      const response = await fetch(`${baseUrl}/approvals/${approvalRequestId}/approve`, {
        method: "POST"
      });
      return response.json();
    },
    async getActivityFeed() {
      const response = await fetch(`${baseUrl}/activity`);
      return response.json();
    }
  };
}
