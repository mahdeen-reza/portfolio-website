"use client";

import { useSyncExternalStore, useCallback } from "react";

// Tiny pub/sub for preloader → hero coordination.
// Fires once when the preloader exit animation starts (or immediately if skipped).

let done = false;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return done;
}

export function markPreloaderDone() {
  done = true;
  listeners.forEach((cb) => cb());
}

export function usePreloaderDone() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
