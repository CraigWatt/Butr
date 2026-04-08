import type { ActivityFeedViewModel } from "../contracts";
import { describeActivityFeed } from "../view-models";

export interface ActivityFeedProps {
  activity: ActivityFeedViewModel;
}

export function ActivityFeed(_props: ActivityFeedProps) {
  return {
    summary: describeActivityFeed(_props.activity),
    approvals: _props.activity.approvals.length,
    executions: _props.activity.executions.length,
    audits: _props.activity.audits.length
  };
}
