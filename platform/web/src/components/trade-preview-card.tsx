import type { TradePreviewViewModel } from "../contracts";
import { describeTradePreview } from "../view-models";

export interface TradePreviewCardProps {
  viewModel: TradePreviewViewModel;
}

export function TradePreviewCard(_props: TradePreviewCardProps) {
  return {
    summary: describeTradePreview(_props.viewModel),
    approvalId: _props.viewModel.approvalRequest.id,
    tradeId: _props.viewModel.preview.id
  };
}
