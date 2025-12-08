// src/lib/cta.ts
type CTAEvent = "open:start" | "open:chat" | "close:all";

const listeners = new Map<CTAEvent, Set<() => void>>();

export function onCTA(ev: CTAEvent, fn: () => void) {
  if (!listeners.has(ev)) listeners.set(ev, new Set());
  listeners.get(ev)!.add(fn);
  return () => listeners.get(ev)!.delete(fn);
}

function emit(ev: CTAEvent) {
  // console.log("[CTA EMIT]", ev);
  listeners.get(ev)?.forEach((fn) => fn());
}

export const CTA = {
  openStart: () => emit("open:start"),
  openChat: () => emit("open:chat"),
  closeAll: () => emit("close:all"),
};
