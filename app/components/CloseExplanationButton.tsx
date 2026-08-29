"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function CloseExplanationButton() {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.back();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <button
      type="button"
      className="explanationPanel__close"
      onClick={() => router.back()}
      autoFocus
    >
      close
    </button>
  );
}
