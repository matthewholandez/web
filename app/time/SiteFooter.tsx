"use client";

import { useEffect, useRef, useState } from "react";

export default function SiteFooter() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and move focus into the dialog when it opens.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <footer className="footer">
        <button
          type="button"
          className="footer__btn"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          What is this?
        </button>
        <span className="footer__dot" aria-hidden="true" />
        <a className="footer__btn" href="/">
          Home
        </a>
      </footer>

      {open && (
        <div
          className="modal"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="about-title" className="modal__title">
              What is this?
            </h2>
            <p className="modal__body">
              A countdown to the next most significant milestone in my life.
            </p>
            <button
              type="button"
              ref={closeRef}
              className="footer__btn modal__close"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
