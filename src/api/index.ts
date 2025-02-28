import { apiKey, apiURl } from '@/constants';

export const handleErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

export const convertToPdf = async (text: string): Promise<string | null> => {
  const apiUrl = `${apiURl}/create-pdf?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    if (!buffer || buffer.byteLength === 0) {
      throw new Error('Received empty response from server');
    }

    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64String;
  } catch (error) {
    console.error('Error converting to PDF:', error);
    throw error;
  }
};
