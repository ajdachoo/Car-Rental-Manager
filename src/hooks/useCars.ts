import { useCallback } from 'react';
import API from './API';

export const useCars = () => {
    const getCars = useCallback(async () => {
        try {
            const result = await API.get<CarProps[]>('/cars');
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const deleteCar = useCallback(async (id: number) => {
        try {
            const result = await API.delete(`/cars/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const postCar = useCallback(async (car: CarPutPostProps) => {
        try {
            console.log(car);
            const result = await API.post(`/cars`, car);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const putCar = useCallback(async (car: CarPutPostProps, carID: number) => {
        try {
            const result = await API.put(`/cars/${carID}`, car);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const getCar = useCallback(async (id: number) => {
        try {
            const result = await API.get(`/cars/${id}`);
            return result.data;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return { getCars, deleteCar, putCar, getCar, postCar };
};

export interface CarProps {
    id: number,
    mark: string,
    model: string,
    transmission: TransmissionEnum,
    enginePower: number,
    drivingLicenseCategory: DrivingLicenseCategoriesEnum,
    numberOfSeats: number,
    pricePerDay: number,
    registrationNumber: string,
    vin: string,
    status: CarStatusEnum,
    comments: string
};

export interface CarPutPostProps {
    mark: string,
    model: string,
    transmission: TransmissionEnum,
    enginePower: number,
    drivingLicenseCategory: DrivingLicenseCategoriesEnum,
    numberOfSeats: number,
    pricePerDay: number,
    registrationNumber: string,
    vin: string,
    status: CarStatusEnum,
    comments: string
}

export enum TransmissionEnum {
    Authomatic = 'Authomatic',
    Manual = 'Manual'
}

export enum CarStatusEnum {
    OutOfOrder = 'OutOfOrder',
    InService = 'InService',
    Rented = 'Rented',
    Avaliable = 'Avaliable'
}

export enum DrivingLicenseCategoriesEnum {
    AM = 'AM',
    A1 = 'A1',
    A2 = 'A2',
    A = 'A',
    B1 = 'B1',
    B = 'B',
    C1 = 'C1',
    C = 'C',
    D1 = 'D1',
    D = 'D',
    BE = 'BE',
    C1E = 'C1E',
    CE = 'CE',
    D1E = 'D1E',
    DE = 'DE',
    T = 'T'
}

/*const api = axios.create({
    baseURL: 'https://localhost:5001/api/',
});

const endpoints = {
    cars: 'cars'
};

const [cars, setCars] = useState([]);

useEffect(() => {
    api.get(endpoints.cars)
        .then(({ data }) => {
            setCars(data)
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}, []); */