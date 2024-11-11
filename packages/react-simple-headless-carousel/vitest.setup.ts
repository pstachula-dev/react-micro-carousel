/* eslint-disable max-classes-per-file */
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

class MockIntersectionObserver implements IntersectionObserver {
  root: Document | Element | null = null;

  rootMargin: string = ``;

  thresholds: readonly number[] = [];

  disconnect = vi.fn();

  observe = vi.fn();

  takeRecords = vi.fn();

  unobserve = vi.fn();
}
window.IntersectionObserver = MockIntersectionObserver;

class MockResizeObserver implements ResizeObserver {
  root: Document | Element | null = null;

  rootMargin: string = ``;

  thresholds: readonly number[] = [];

  disconnect = vi.fn();

  observe = vi.fn();

  takeRecords = vi.fn();

  unobserve = vi.fn();
}
window.ResizeObserver = MockResizeObserver;

afterEach(() => {
  cleanup();
});
