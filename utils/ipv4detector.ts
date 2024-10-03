import { REACT_APP_HOST_IP } from '@env';

export const getHostIP = (): string | null => {
    return REACT_APP_HOST_IP || null;
};
