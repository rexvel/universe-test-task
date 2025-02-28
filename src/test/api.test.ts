import { convertToPdf, handleErrorMessage } from '@/api';
import { apiKey, apiURl } from '@/constants';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  setupMocks,
  resetMocks,
  mockFetch,
  createSuccessResponse,
  createErrorResponse,
} from './mocks';

setupMocks();

describe('API functions', () => {
  beforeEach(() => {
    resetMocks();
  });

  describe('convertToPdf', () => {
    it('should successfully convert text to PDF', async () => {
      const mockArrayBuffer = new ArrayBuffer(8);
      const mockResponse = createSuccessResponse(mockArrayBuffer);

      mockFetch.mockResolvedValue(mockResponse as Response);

      const result = await convertToPdf('Test text');

      expect(global.fetch).toHaveBeenCalledWith(`${apiURl}/create-pdf?apiKey=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        body: JSON.stringify({ text: 'Test text' }),
      });

      expect(mockResponse.arrayBuffer).toHaveBeenCalled();
      expect(global.btoa).toHaveBeenCalled();
      expect(result).toBe('mocked-base64-string');
    });

    it('should handle HTTP errors', async () => {
      const mockErrorResponse = createErrorResponse(500);

      mockFetch.mockResolvedValue(mockErrorResponse as Response);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await convertToPdf('Test text');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error converting to PDF:',
        'HTTP error! status: 500',
      );

      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });

    it('should handle empty response', async () => {
      const mockEmptyResponse = createSuccessResponse(new ArrayBuffer(0));

      mockFetch.mockResolvedValue(mockEmptyResponse as Response);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await convertToPdf('Test text');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error converting to PDF:',
        'Received empty response from server',
      );

      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValue(networkError);

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await convertToPdf('Test text');

      expect(consoleSpy).toHaveBeenCalledWith('Error converting to PDF:', 'Network error');

      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe('handleErrorMessage', () => {
    it('should return error message for Error instances', () => {
      const error = new Error('Test error');
      expect(handleErrorMessage(error)).toBe('Test error');
    });

    it('should return "Unknown error" for non-Error instances', () => {
      expect(handleErrorMessage('string error')).toBe('Unknown error');
      expect(handleErrorMessage(null)).toBe('Unknown error');
      expect(handleErrorMessage(undefined)).toBe('Unknown error');
      expect(handleErrorMessage(42)).toBe('Unknown error');
    });
  });
});
