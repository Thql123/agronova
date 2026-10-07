"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MobileFarmNavigation({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // CSS controls layout; this only releases modal focus when entering desktop.
    const desktop = window.matchMedia("(min-width: 80rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="shrink-0 xl:hidden">
      <button
        type="button"
        aria-label="Open farm navigation"
        aria-haspopup="dialog"
        aria-controls="mobile-farm-navigation"
        onClick={() => dialogRef.current?.showModal()}
        className="flex size-10 items-center justify-center rounded-lg border border-[#d8d8d8] focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-farm-navigation"
        aria-labelledby="mobile-farm-navigation-title"
        className="fixed inset-y-0 right-auto left-0 m-0 h-dvh max-h-dvh w-[min(320px,calc(100vw-32px))] max-w-none border-0 bg-white p-0 font-sans text-black backdrop:bg-black/30"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
              event.currentTarget.close();
            }
          }
        }}
      >
        <div className="flex h-full min-h-0 flex-col" onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) dialogRef.current?.close();
        }}>
          <div className="flex shrink-0 items-center justify-between border-b border-[#eeeeee] px-4 py-2">
            <h2 id="mobile-farm-navigation-title" className="text-sm font-semibold">Farm navigation</h2>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close farm navigation" className="flex size-10 items-center justify-center rounded-lg focus-visible:outline-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </div>
  );
}
