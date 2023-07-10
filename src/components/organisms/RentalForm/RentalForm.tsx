import React, { useState, useEffect } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldDate, FormFieldSelect, formSelectOptionProps } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { RentalPutPostProps, useRentals } from "hooks/useRentals";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useCars, CarProps } from "hooks/useCars";
import { useClients, ClientProps } from "hooks/useClients";

interface FormProps {
    initialformValues?: formValuesProps;
    method: 'add' | 'edit';
    rentalEditID?: number;
};

export interface formValuesProps {
    carId: string;
    clientId: string;
    hireDate: string;
    expectedDateOfReturn: string;
    dateOfReturn: string;
    comment: string;
};

const initialFormState: formValuesProps = {
    carId: '',
    clientId: '',
    hireDate: '',
    expectedDateOfReturn: '',
    dateOfReturn: '',
    comment: '',
};

const dateToISO8601 = (date: string): string => {
    if (date !== '') {
        let result = new Date(date);
        return result.toISOString();
    } else {
        return '';
    }
};

const formValuesToRentalProps = (formValues: formValuesProps): RentalPutPostProps => {
    return {
        ...formValues,
        carId: parseInt(formValues.carId),
        clientId: parseInt(formValues.clientId),
        hireDate: dateToISO8601(formValues.hireDate),
        expectedDateOfReturn: dateToISO8601(formValues.expectedDateOfReturn),
        dateOfReturn: dateToISO8601(formValues.dateOfReturn)
    };
};

const clientsToOptions = (clients: ClientProps[]): formSelectOptionProps[] => {
    let options: formSelectOptionProps[] = [];

    clients.forEach(({ id, firstName, lastName, peselOrPassportNumber, isBlocked }) => {
        if (!isBlocked) {
            options.push({ option: `${firstName} ${lastName} ${peselOrPassportNumber}`, value: id })
        };
    });
    return options.length > 0 ? options : [{ option: 'Brak', value: 0 }];
};

const carsToOptions = (cars: CarProps[]): formSelectOptionProps[] => {
    let options: formSelectOptionProps[] = [];

    cars.forEach(({ id, availableNow, efficientNow, mark, model, registrationNumber, automaticTransmission, horsepower, countPlace, priceForDay }) => {
        if (availableNow && efficientNow) {
            options.push({ option: `${mark} ${model} ${registrationNumber} ${horsepower}KM ${automaticTransmission ? 'Automatyczna' : 'Manualna'} ${countPlace}msc. ${priceForDay.toFixed(2)} zł./dzień`, value: id })
        };
    });
    return options.length > 0 ? options : [{ option: 'Brak', value: 0 }];
};

const RentalForm: React.FC<FormProps> = ({ initialformValues = initialFormState, method, rentalEditID }) => {
    const [clients, setClients] = useState<ClientProps[]>();
    const [cars, setCars] = useState<CarProps[]>();
    const { getClients } = useClients();
    const { getCars } = useCars();

    const [formValues, setFormValues] = useState<formValuesProps>(initialformValues);
    const { postRental, putRental } = useRentals();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [cars, clients] = await Promise.all([getCars(), getClients()]);
        setCars(cars);
        setClients(clients);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
        console.log(formValues);
    };

    const handleAddRental = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatRental = formValuesToRentalProps(formValues)
        console.log(formatRental);
        const response = await postRental(formatRental);
        if (isAxiosError(response)) {
            alert('niepoprawne dane!');
        } else {
            setFormValues(initialFormState);
            navigate('/rentals');
        }
    };

    const handleEditRental = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rentalEditID) {
            const formatRental = formValuesToRentalProps(formValues)
            const response = await putRental(formatRental, rentalEditID);
            if (isAxiosError(response)) {
                alert('niepoprawne dane!');
            } else {
                setFormValues(initialFormState);
                navigate('/rentals');
            }
        } else {
            alert('niepoprawne dane!');
        }
    };

    return (
        <ViewWrapper as="form" onSubmit={method === 'add' ? handleAddRental : handleEditRental}>
            <Title>{method === 'add' ? 'Nowe wypożyczenie' : 'Edytuj wypożyczenie'}</Title>
            <FormFieldSelect options={cars ? carsToOptions(cars) : [{ option: 'Ładowanie...', value: 0 }]} label="Wybierz pojazd" id="carId" name="carId" value={formValues.carId} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldSelect options={clients ? clientsToOptions(clients) : [{ option: 'Ładowanie...', value: 0 }]} label="Wybierz klienta" id="clientId" name="clientId" value={formValues.clientId} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldDate label="Data od" id="hireDate" name="hireDate" value={formValues.hireDate} onChange={handleInputChange} />
            <FormFieldDate label="Data do" id="expectedDateOfReturn" name="expectedDateOfReturn" value={formValues.expectedDateOfReturn} onChange={handleInputChange} />
            <FormFieldDate label="Data zwrotu" id="dateOfReturn" name="dateOfReturn" value={formValues.dateOfReturn} onChange={handleInputChange} />
            <FormField label="Komentarz" id="comment" name="comment" value={formValues.comment} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Stwórz' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default RentalForm;