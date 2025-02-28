import { apiKey, apiURl } from '@/constants';

export const handleErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

};

export const convertToPdf = async (text: string, options: { timeout?: number } = {}): Promise<string | null> => {
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
        const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return base64String;
    } catch (error) {

    }
};
