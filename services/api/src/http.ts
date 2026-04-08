import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { approveTrade, getButrActivityFeed, handleChatMessage, getPortfolioSnapshot, listTradePreviews } from "./main";

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
