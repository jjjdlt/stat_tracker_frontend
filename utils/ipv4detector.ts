import { REACT_APP_HOST_IP } from '@env';  // Ensure you're importing the env variable

export const getHostIP = async (): Promise<string | null> => {
    try {
        const response = await fetch(`http://${REACT_APP_HOST_IP}:8000/get-ip`);  // Ensure env var is loaded
        const data = await response.json();
        return data.ip || null;
    } catch (error) {
        console.error('Error fetching host IP:', error);

        // Fallback to localhost if needed during development
        return '127.0.0.1';  // or return a default known working IP
    }
};
