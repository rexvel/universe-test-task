import { vi } from 'vitest';

export type MockFetch = ReturnType<typeof vi.fn<typeof fetch>>;
export type MockResponse = Partial<Response>;

export const mockFetch = vi.fn() as MockFetch;

export const mockBtoa = vi.fn(_ => 'mocked-base64-string');

export const createSuccessResponse = (data: ArrayBuffer): MockResponse => ({
  ok: true,
  arrayBuffer: vi.fn().mockResolvedValue(data),
  headers: new Headers(),
  redirected: false,
  status: 200,
  statusText: 'OK',
  type: 'basic',
  url: '',
  clone: vi.fn(),
  body: null,
  bodyUsed: false,
  json: vi.fn(),
  text: vi.fn(),
  blob: vi.fn(),
  formData: vi.fn(),
});

export const createErrorResponse = (status = 500): MockResponse => ({
  ok: false,
  status,
  headers: new Headers(),
  redirected: false,
  statusText: 'Internal Server Error',
  type: 'basic',
  url: '',
  clone: vi.fn(),
  body: null,
  bodyUsed: false,
  arrayBuffer: vi.fn(),
  json: vi.fn(),
  text: vi.fn(),
  blob: vi.fn(),
  formData: vi.fn(),
});

export const setupMocks = () => {
  global.fetch = mockFetch;
  global.btoa = mockBtoa;
};

export const resetMocks = () => {
  vi.clearAllMocks();
};
