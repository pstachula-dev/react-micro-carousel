import { memo, type ReactNode } from "react";

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-hidden relative min-h-[200px] w-full border border-red-500">
      {children}
    </div>
  );
});
