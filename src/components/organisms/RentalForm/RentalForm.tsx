import React, { useState, useEffect } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldDate, FormFieldSelect, FormFieldTime, formSelectOptionProps } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { RentalPutPostProps, useRentals } from "hooks/useRentals";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useCars, CarProps } from "hooks/useCars";
import { useClients, ClientProps } from "hooks/useClients";
import { getFormatDate, getFormatTime } from "components/molecules/RentalTableRow/RentalTableRow";

interface FormProps {
    initialformValues?: formValuesProps;
};

export interface formValuesProps {
    carId: string;
    clientId: string;
    userId: string;
    rentalDate: string;
    startTime: string;
    expectedDateOfReturn: string;
    expectedReturnTime: string;
    comments: string;
};

const initialFormState: formValuesProps = {
    carId: '',
    clientId: '',
    userId: '1',
    rentalDate: '',
    startTime: '',
    expectedDateOfReturn: '',
    expectedReturnTime: '12:00',
    comments: '',
};

const formValuesToRentalProps = (formValues: formValuesProps): RentalPutPostProps => {
    console.log(`${formValues.expectedDateOfReturn},${formValues.expectedReturnTime}`);
    return {
        carId: parseInt(formValues.carId),
        clientId: parseInt(formValues.clientId),
        userId: parseInt(formValues.userId),
        rentalDate: new Date(`${formValues.rentalDate},${formValues.startTime}`).toISOString(),
        expectedDateOfReturn: new Date(`${formValues.expectedDateOfReturn},${formValues.expectedReturnTime}`).toISOString(),
        comments: formValues.comments,
    };
};

const clientsToOptions = (clients: ClientProps[]): formSelectOptionProps[] => {
    let options: formSelectOptionProps[] = [{ option: 'Wybierz klienta', value: '' }];

    clients.forEach(({ id, name, surname, peselOrPassportNumber, isBlocked }) => {
        if (!isBlocked) {
            options.push({ option: `${name} ${surname} ${peselOrPassportNumber}`, value: id })
        };
    });
    return options.length > 0 ? options : [{ option: 'Brak', value: 0 }];
};

const carsToOptions = (cars: CarProps[]): formSelectOptionProps[] => {
    let options: formSelectOptionProps[] = [{ option: 'Wybierz pojazd', value: '' }];

    cars.forEach(({ id, status, mark, model, registrationNumber, transmission, enginePower, numberOfSeats, pricePerDay }) => {
        if (status === 'Avaliable') {
            options.push({ option: `${mark} ${model} ${registrationNumber} ${enginePower}KM ${transmission} ${numberOfSeats}msc. ${pricePerDay.toFixed(2)} zł./dzień`, value: id })
        };
    });
    return options.length > 0 ? options : [{ option: 'Brak', value: 0 }];
};

const RentalForm: React.FC<FormProps> = ({ initialformValues = initialFormState }) => {
    const [clients, setClients] = useState<ClientProps[]>();
    const [cars, setCars] = useState<CarProps[]>();
    const { getClients } = useClients();
    const { getCars } = useCars();

    const [formValues, setFormValues] = useState<formValuesProps>(initialformValues);
    const { postRental } = useRentals();
    const navigate = useNavigate();

    useEffect(() => {
        setFormValues({
            ...formValues,
            rentalDate: getFormatDate(new Date()),
            startTime: getFormatTime(new Date())
        });
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

    return (
        <ViewWrapper as="form" onSubmit={handleAddRental}>
            <Title>Nowe wypożyczenie</Title>
            <FormFieldSelect isRequired options={cars ? carsToOptions(cars) : [{ option: 'Ładowanie...', value: 0 }]} label="Wybierz pojazd" id="carId" name="carId" value={formValues.carId} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldSelect isRequired options={clients ? clientsToOptions(clients) : [{ option: 'Ładowanie...', value: 0 }]} label="Wybierz klienta" id="clientId" name="clientId" value={formValues.clientId} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldDate isRequired label="Data od" id="rentalDate" name="rentalDate" value={formValues.rentalDate} onChange={handleInputChange} />
            <FormFieldTime isRequired label="Godzina wynajmu" id="startTime" name="startTime" value={formValues.startTime} onChange={handleInputChange} />
            <FormFieldDate isRequired minDate={formValues.rentalDate} label="Data do" id="expectedDateOfReturn" name="expectedDateOfReturn" value={formValues.expectedDateOfReturn} onChange={handleInputChange} />
            <FormFieldTime isRequired label="Godzina zwrotu" id="expectedReturnTime" name="expectedReturnTime" value={formValues.expectedReturnTime} onChange={handleInputChange} />
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">Stwórz</FormButton>
        </ViewWrapper>
    );
};

export default RentalForm;