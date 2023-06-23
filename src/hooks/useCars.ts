export const cars = [
    {
        "id": 1,
        "registrationNumber": "Test324",
        "vinNumer": "Test75",
        "mark": "TestMark3",
        "model": "TestMode34",
        "automaticTransmission": false,
        "horsepower": 200,
        "countPlace": 2,
        "category": "B",
        "efficientNow": false,
        "availableNow": false,
        "priceForDay": 0,
        "comments": "samochod sportowy"
    },
    {
        "id": 2,
        "registrationNumber": "Test623",
        "vinNumer": "Test442",
        "mark": "TestMark2",
        "model": "TestModel2",
        "automaticTransmission": false,
        "horsepower": 90,
        "countPlace": 4,
        "category": "B",
        "efficientNow": true,
        "availableNow": true,
        "priceForDay": 0,
        "comments": "uszkodzona kierwnica"
    },
    {
        "id": 3,
        "registrationNumber": "Test123",
        "vinNumer": "Test432",
        "mark": "TestMark1",
        "model": "TestModel1",
        "automaticTransmission": false,
        "horsepower": 86,
        "countPlace": 5,
        "category": "B",
        "efficientNow": true,
        "availableNow": true,
        "priceForDay": 0,
        "comments": null
    }
];

export type CarProp = {
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