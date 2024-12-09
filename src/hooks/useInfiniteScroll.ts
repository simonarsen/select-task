import { useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  threshold?: number;
  root?: HTMLElement | null;
  rootMargin?: string;
  shouldStop?: boolean;
}

export const useInfiniteScroll = ({
  onIntersect,
  threshold = 0,
  root = null,
  rootMargin = "0px",
  shouldStop,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target || shouldStop) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [target, root, rootMargin, threshold, onIntersect, shouldStop]);

  return { setTarget };
};
