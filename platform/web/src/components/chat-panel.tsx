import type { ChatTurn } from "../contracts";

export interface ChatPanelProps {
  turns: ChatTurn[];
}

export function ChatPanel(_props: ChatPanelProps) {
  return {
    turns: _props.turns.map((turn) => `${turn.role}: ${turn.content}`)
  };
}
