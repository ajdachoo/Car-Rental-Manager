import { useCallback } from 'react';
import API from './API';

export const useRentals = () => {
    const getRentals = useCallback(async () => {
        try {
            const result = await API.get<RentalProp[]>('/hires');
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getRentals };
};

export interface RentalProp {
    id: number;
    carId: number;
    carMark: string;
    carModel: string;
    registrationNumber: string;
    clientId: number;
    firstName: string;
    lastName: string;
    peselOrPassportNumber: string;
    hireDate: string;
    expectedDateOfReturn: string;
    dateOfReturn: string;
    comment: null | string;
    status: -1 | 0 | 1;
};