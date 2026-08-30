"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const explanationMotionDuration = 320;

export function CloseExplanationButton() {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (isClosingRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.back();
      return;
    }

    isClosingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = setTimeout(
      () => router.back(),
      explanationMotionDuration,
    );
  }, [router]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [close]);

  return (
    <button
      type="button"
      className="explanationPanel__close"
      data-closing={isClosing ? "true" : undefined}
      aria-disabled={isClosing}
      onClick={close}
      autoFocus
    >
      close
    </button>
  );
}
