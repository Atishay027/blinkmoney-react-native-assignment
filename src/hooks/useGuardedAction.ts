import { useCallback, useRef } from 'react';

/**
 * Wraps a CTA handler so repeated calls within `windowMs` of the first are ignored.
 * Guards navigation-triggering buttons against double-tap/rapid-tap firing twice
 * (e.g. pushing a screen onto the stack two times before the first transition settles).
 */
export function useGuardedAction<Args extends unknown[]>(
  action: (...args: Args) => void,
  windowMs = 800
) {
  const blockedUntilRef = useRef(0);

  return useCallback(
    (...args: Args) => {
      const now = Date.now();
      if (now < blockedUntilRef.current) return;
      blockedUntilRef.current = now + windowMs;
      action(...args);
    },
    [action, windowMs]
  );
}
