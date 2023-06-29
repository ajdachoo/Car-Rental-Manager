import { useCallback } from 'react';
import API from './API';

export const useClients = () => {
    const getClients = useCallback(async () => {
        try {
            const result = await API.get<ClientProps[]>('/clients');
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const deleteClient = useCallback(async (id: number) => {
        try {
            const result = await API.delete(`/clients/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const postClient = useCallback(async (client: ClientPutPostProps) => {
        try {
            const result = await API.post(`/clients`, client);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const putClient = useCallback(async (client: ClientPutPostProps, clientID: number) => {
        try {
            const result = await API.put(`/clients/${clientID}`, client);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const getClient = useCallback(async (id: number) => {
        try {
            const result = await API.get(`/clients/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { deleteClient, getClients, postClient, putClient, getClient };
};

export interface ClientProps {
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

export interface ClientPutPostProps {
    firstName: string;
    lastName: string;
    peselOrPassportNumber: string;
    email: string;
    phoneNumber: string;
    drivingLicenseCategory: string;
    isBlocked: boolean;
    comments: string;
};