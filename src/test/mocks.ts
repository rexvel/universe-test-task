import { vi } from 'vitest';

export type MockFetch = ReturnType<typeof vi.fn<typeof fetch>>;
export type MockResponse = Partial<Response>;

export const mockFetch = vi.fn() as MockFetch;

export const mockBtoa = vi.fn(_ => 'mocked-base64-string');

const baseResponseProps: MockResponse = {
  headers: new Headers(),
  redirected: false,
  type: 'basic',
  url: '',
  clone: vi.fn(),
  body: null,
  bodyUsed: false,
  json: vi.fn(),
  text: vi.fn(),
  blob: vi.fn(),
  formData: vi.fn(),
};

export const createSuccessResponse = (data: ArrayBuffer): MockResponse => ({
  ...baseResponseProps,
  ok: true,
  arrayBuffer: vi.fn().mockResolvedValue(data),
  status: 200,
  statusText: 'OK',
});

export const createErrorResponse = (status = 500): MockResponse => ({
  ...baseResponseProps,
  ok: false,
  status,
  statusText: 'Internal Server Error',
  arrayBuffer: vi.fn(),
});

export const setupMocks = () => {
  global.fetch = mockFetch;
  global.btoa = mockBtoa;
};

export const resetMocks = () => {
  vi.clearAllMocks();
};
