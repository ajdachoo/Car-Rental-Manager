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
    id: number
    registrationNumber: string;
    vinNumer: string;
    mark: string;
    model: string;
    automaticTransmission: boolean;
    horsepower: number;
    countPlace: number;
    category: string;
    efficientNow: boolean;
    availableNow: boolean;
    priceForDay: number;
    comments: string;
};

export interface CarPutPostProps {
    registrationNumber: string;
    vinNumer: string;
    mark: string;
    model: string;
    automaticTransmission: boolean;
    horsepower: number;
    countPlace: number;
    category: string;
    efficientNow: boolean;
    availableNow: boolean;
    priceForDay: number;
    comments: string;
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