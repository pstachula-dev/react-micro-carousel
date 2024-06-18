import { memo, type ReactNode } from "react";

export const Slide = memo(
  ({ children }: { children: ReactNode; index: number }) => {
    return <div className="relative w-full">{children}</div>;
  }
);
