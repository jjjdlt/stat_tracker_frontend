export const getHostIP = async (): Promise<string | null> => {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_HOST_IP}:8000/get-ip`);
        const data = await response.json();
        return data.ip || null;
    } catch (error) {
        console.error('Error fetching host IP:', error);
        return null;
    }
};
