import { apiKey, apiURl } from '@/constants';

export const handleErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
        return 'Request timed out';
    }
    return 'Unknown error';
};

export const convertToPdf = async (text: string, options: { timeout?: number } = {}): Promise<string | null> => {
    const apiUrl = `${apiURl}/create-pdf?apiKey=${apiKey}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout);

    let attempt = 0;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/pdf',
            },
            body: JSON.stringify({ text }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return base64String;
    } catch (error) {
        clearTimeout(timeoutId);

        attempt++;

        if (attempt > options.retries) {
            console.error('Error generating PDF:', error instanceof Error ? error.message : 'Unknown error');
            return null;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};
