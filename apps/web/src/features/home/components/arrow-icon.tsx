type ArrowIconProps = {
  direction?: "right" | "up" | "up-right";
};

const paths = {
  right: "M5 12h14m-6-6 6 6-6 6",
  up: "M12 19V5m-6 6 6-6 6 6",
  "up-right": "M6 18 18 6M6 6h12v12",
};

export function ArrowIcon({ direction = "right" }: ArrowIconProps) {
  return (
    <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[direction]} />
    </svg>
  );
}
