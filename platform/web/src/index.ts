export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export * from "./contracts";
export * from "./chat-flow";
export * from "./dashboard";
export * from "./client";
export * from "./view-models";
export * from "./components";
