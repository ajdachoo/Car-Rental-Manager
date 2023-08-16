import { useCallback } from 'react';
import API from './API';
import { CarProps } from './useCars';
import { ClientProps } from './useClients';
import { UserProps } from './useUsers';

export const useRentals = () => {
    const getRentals = useCallback(async (status?: RentalStatusEnum) => {
        try {
            const result = await API.get<RentalProps[]>('/rentals', { params: { status: status } });
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const deleteRental = useCallback(async (id: number) => {
        try {
            const result = await API.delete(`/rentals/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const postRental = useCallback(async (rental: RentalPutPostProps) => {
        try {
            console.log(rental);
            const result = await API.post(`/rentals`, rental);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const putRental = useCallback(async (rental: RentalPutPostProps, rentalID: number) => {
        try {
            const result = await API.put(`rentals/${rentalID}`, rental);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const getRental = useCallback(async (id: number) => {
        try {
            const result = await API.get<RentalProps>(`/rentals/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const getFinishRental = useCallback(async (id: number, rental: RentalFinishProps) => {
        try {
            const result = await API.post<number>(`/rentals/${id}/finish`, rental);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    return { getRentals, deleteRental, postRental, putRental, getRental, getFinishRental };
};

export interface RentalProps {
    id: number;
    car: CarProps;
    client: ClientProps;
    user: UserProps
    rentalDate: string;
    expectedDateOfReturn: string;
    status: RentalStatusEnum;
    amount: number;
    comments: string;
    dateOfReturn: string;
};

export interface RentalPutPostProps {
    carId: number;
    clientId: number;
    userId: number;
    rentalDate: string;
    expectedDateOfReturn: string;
    comments: string;
};

export interface RentalFinishProps {
    dateOfReturn: string;
}

export enum RentalStatusEnum {
    Active = 'Active',
    Delayed = 'Delayed',
    Finished = 'Finished',
}