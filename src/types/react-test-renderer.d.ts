declare module 'react-test-renderer' {
  import type { ReactElement } from 'react';

  export function act(callback: () => void): void;

  export interface TestRenderer {
    toJSON(): unknown;
    unmount(): void;
  }

  function create(element: ReactElement): TestRenderer;

  const TestRendererNamespace: { create: typeof create };
  export default TestRendererNamespace;
}
