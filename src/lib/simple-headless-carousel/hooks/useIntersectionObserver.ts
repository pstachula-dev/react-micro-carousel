import { useEffect, useState, RefObject } from 'react';

type UseIntersectionObserverResult = {
  entry?: IntersectionObserverEntry;
};

type UseIntersectionObserverProps<T> = {
  ref: RefObject<T>;
  opts: IntersectionObserverInit;
};

export const useIntersectionObserver = <T extends HTMLElement>({
  ref,
  opts = {},
}: UseIntersectionObserverProps<T>): UseIntersectionObserverResult => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!ref.current) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      for (const sectionEntry of entries) {
        if (sectionEntry.target === ref.current) {
          setEntry(sectionEntry);
        }
      }
    };

    const observer = new IntersectionObserver(handleObserver, opts);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, opts.threshold, opts.root, opts.rootMargin]);

  return { entry };
};
