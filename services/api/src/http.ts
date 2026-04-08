import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  approveTrade,
  getButrActivityFeed,
  getPortfolioSnapshot,
  getTrading212ConnectionStatus,
  handleChatMessage,
  listExecutionTickets,
  listTradePreviews,
  previewStructuredTradeIntent,
  saveTrading212Connection
} from "./main";

async function readJsonBody(req: IncomingMessage): Promise<any> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  if (chunks.length === 0) {
    return null;
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(res: ServerResponse, statusCode: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(payload);
}

export function createButrHttpServer() {
  return createServer(async (req, res) => {
    const requestUrl = new URL(req.url ?? "/", "http://localhost");
    const pathname = requestUrl.pathname;

    try {
      if (req.method === "GET" && pathname === "/health") {
        sendJson(res, 200, { ok: true, service: "butr-api" });
        return;
      }

      if (req.method === "GET" && pathname === "/status") {
        sendJson(res, 200, getTrading212ConnectionStatus());
        return;
      }

      if (req.method === "POST" && pathname === "/setup/trading212") {
        const body = await readJsonBody(req);
        if (!body?.apiKey || !body?.apiSecret) {
          sendJson(res, 400, { error: "apiKey and apiSecret are required" });
          return;
        }
        const connection = saveTrading212Connection({
          apiKey: String(body.apiKey),
          apiSecret: String(body.apiSecret)
        });
        sendJson(res, 200, {
          connected: true,
          createdAt: connection.createdAt,
          updatedAt: connection.updatedAt
        });
        return;
      }

      if (req.method === "GET" && pathname === "/portfolio") {
        const mode = requestUrl.searchParams.get("mode") === "live" ? "live" : "paper";
        sendJson(res, 200, await getPortfolioSnapshot(mode));
        return;
      }

      if (req.method === "GET" && pathname === "/activity") {
        sendJson(res, 200, getButrActivityFeed());
        return;
      }

      if (req.method === "GET" && pathname === "/previews") {
        sendJson(res, 200, listTradePreviews());
        return;
      }

      if (req.method === "GET" && pathname === "/execution-tickets") {
        sendJson(res, 200, listExecutionTickets());
        return;
      }

      if (req.method === "POST" && pathname === "/trade-intents/preview") {
        const body = await readJsonBody(req);
        const response = await previewStructuredTradeIntent(body);
        sendJson(res, 200, response);
        return;
      }

      if (req.method === "POST" && pathname.startsWith("/approvals/") && pathname.endsWith("/approve")) {
        const approvalRequestId = pathname.split("/")[2];
        sendJson(res, 200, await approveTrade(approvalRequestId));
        return;
      }

      if (req.method === "POST" && pathname === "/chat") {
        const body = await readJsonBody(req);
        const response = await handleChatMessage(body);
        sendJson(res, 200, response);
        return;
      }

      sendJson(res, 404, { error: "Not found" });
    } catch (error) {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
}
