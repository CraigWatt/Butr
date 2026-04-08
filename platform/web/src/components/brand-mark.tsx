export interface BrandMarkProps {
  variant?: "mark" | "lockup";
  size?: number;
}

export function BrandMark(_props: BrandMarkProps) {
  const variant = _props.variant ?? "mark";
  const size = _props.size ?? 32;
  const src = variant === "lockup" ? "/brand/butr-logo.svg" : "/brand/butr-logo.svg";

  return {
    src,
    size
  };
}
