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

    const deleteRental = useCallback(async (id: number) => {
        try {
            const result = await API.delete(`/hires/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const postRental = useCallback(async (rental: RentalPutPostProps) => {
        try {
            const result = await API.post(`/hires`, rental);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const putRental = useCallback(async (rental: RentalPutPostProps, rentalID: number) => {
        try {
            const result = await API.put(`/hires/${rentalID}`, rental);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const getRental = useCallback(async (id: number) => {
        try {
            const result = await API.get(`/cars/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getRentals, deleteRental, postRental, putRental, getRental };
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
    price: number;
};

export interface RentalPutPostProps {
    carId: number;
    clientId: number;
    hireDate: string;
    expectedDateOfReturn: string;
    dateOfReturn: string;
    comment: null | string;
};