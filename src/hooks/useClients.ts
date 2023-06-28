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

    const postClient = useCallback(async (client: ClientFormProps) => {
        try {
            console.log(client);
            const result = await API.post(`/clients`, client);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const putClient = useCallback(async (client: ClientFormProps, clientID: number) => {
        try {
            console.log(client);
            const result = await API.put(`/clients/${clientID}`, client);
            console.log(result);
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

export interface ClientProps extends ClientFormProps {
    id: number;
};

export interface ClientFormProps {
    firstName: string;
    lastName: string;
    peselOrPassportNumber: string;
    email: string;
    phoneNumber: string;
    drivingLicenseCategory: string;
    isBlocked: boolean;
    comments: string;
};