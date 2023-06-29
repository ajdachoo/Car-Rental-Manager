import { useCallback } from 'react';
import API from './API';

export const useCars = () => {
    const getCars = useCallback(async () => {
        try {
            const result = await API.get<CarProp[]>('/cars');
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

    const postCar = useCallback(async (car: CarFormProps) => {
        try {
            const result = await API.post(`/clients`, car);
            return result.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    }, []);

    const putCar = useCallback(async (car: CarFormProps, clientID: number) => {
        try {
            const result = await API.put(`/clients/${clientID}`, car);
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

export interface CarProp extends CarFormProps {
    id: number;
    automaticTransmission: boolean;
    horsepower: number;
    countPlace: number;
    efficientNow: boolean;
    availableNow: boolean;
    priceForDay: number;
};

export interface CarFormProps {
    registrationNumber: string;
    vinNumer: string;
    mark: string;
    model: string;
    automaticTransmission: boolean | string;
    horsepower: number | string;
    countPlace: number | string;
    category: string;
    efficientNow: boolean | string;
    availableNow: boolean | string;
    priceForDay: number | string;
    comments: string | null;
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