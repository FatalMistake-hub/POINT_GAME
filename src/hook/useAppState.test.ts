import { renderHook, act } from '@testing-library/react';
import { useAppState } from './useAppState';
import { describe, test, expect } from 'vitest';
describe('useAppState Hook', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current[0].point).toBe(0);
    expect(result.current[0].timing).toBe(0);
    expect(result.current[0].isSuccess).toBeUndefined();
    expect(result.current[0].running).toBe(false);
  });

  test('should update point', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current[1].setPoint(10);
    });

    expect(result.current[0].point).toBe(10);
  });

  test('should update timing', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current[1].setTiming(100);
    });

    expect(result.current[0].timing).toBe(100);
  });

  test('should update running state', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current[1].setRunning(true);
    });

    expect(result.current[0].running).toBe(true);
  });
});