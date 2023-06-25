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

    return { getCars };
};

export interface CarProp {
    id: number;
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
    comments: string | null;
};

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