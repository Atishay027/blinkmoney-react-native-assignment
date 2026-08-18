import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { useGuardedAction } from '../useGuardedAction';

function TestHarness({
  action,
  windowMs,
  onReady,
}: {
  action: () => void;
  windowMs: number;
  onReady: (fn: () => void) => void;
}) {
  const guarded = useGuardedAction(action, windowMs);
  onReady(guarded);
  return null;
}

function mount(action: () => void, windowMs: number) {
  let guarded: (() => void) | undefined;
  act(() => {
    TestRenderer.create(
      <TestHarness
        action={action}
        windowMs={windowMs}
        onReady={(fn) => {
          guarded = fn;
        }}
      />
    );
  });
  if (!guarded) throw new Error('guarded action was not captured');
  return guarded;
}

describe('useGuardedAction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('fires once for the first tap', () => {
    const action = jest.fn();
    const guarded = mount(action, 800);

    act(() => guarded());

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('ignores a second tap that lands inside the guard window (double-tap protection)', () => {
    const action = jest.fn();
    const guarded = mount(action, 800);

    act(() => {
      guarded();
      guarded();
      guarded();
    });

    expect(action).toHaveBeenCalledTimes(1);
  });

  it('allows another tap once the guard window has elapsed', () => {
    const action = jest.fn();
    const guarded = mount(action, 800);

    act(() => guarded());
    act(() => jest.advanceTimersByTime(900));
    act(() => guarded());

    expect(action).toHaveBeenCalledTimes(2);
  });

  it('still blocks a tap that lands just before the window elapses', () => {
    const action = jest.fn();
    const guarded = mount(action, 800);

    act(() => guarded());
    act(() => jest.advanceTimersByTime(500));
    act(() => guarded());

    expect(action).toHaveBeenCalledTimes(1);
  });
});
