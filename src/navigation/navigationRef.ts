import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/** Cross-stack navigation helper: works whether the target lives in a nested stack or a flat tab. */
export function navigateTo(name: string, params?: object) {
  if (!navigationRef.isReady()) return;
  (navigationRef.navigate as (...args: unknown[]) => void)(name, params);
}
