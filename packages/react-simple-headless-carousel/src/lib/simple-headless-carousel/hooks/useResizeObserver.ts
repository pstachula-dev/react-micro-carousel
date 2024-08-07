import { useEffect, useState, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

type UseResizeObserverProps<T> = {
  ref: RefObject<T>;
  refWidth: number | undefined;
};

export const useResizeObserver = <T extends HTMLElement>(
  ref: RefObject<T>,
): UseResizeObserverProps<T> => {
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    if (!ref.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target === ref.current) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return { ref, refWidth: size?.width };
};
