import { useCallback } from 'react';
import API from './API';

export const useClients = () => {
    const getClients = useCallback(async () => {
        try {
            const result = await API.get<ClientProp[]>('/clients');
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getClients };
};

export interface ClientProp {
    id: number;
    firstName: string;
    lastName: string;
    peselOrPassportNumber: string;
    email: string;
    phoneNumber: string;
    drivingLicenseCategory: string;
    isBlocked: boolean;
    comments: string;
};