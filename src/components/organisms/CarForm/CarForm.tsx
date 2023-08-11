import React, { useState } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldSelect, formSelectOptionProps } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { CarPutPostProps, useCars } from "hooks/useCars";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

interface FormProps {
    initialformValues?: formValuesProps;
    method: 'add' | 'edit';
    carEditID?: number;
};

export interface formValuesProps {
    mark: string,
    model: string,
    transmission: string,
    enginePower: string,
    drivingLicenseCategory: string,
    numberOfSeats: string,
    pricePerDay: string,
    registrationNumber: string,
    vin: string,
    status: string,
    comments: string
};

const initialFormState: formValuesProps = {
    mark: '',
    model: '',
    transmission: 'Authomatic',
    enginePower: '',
    drivingLicenseCategory: 'AM',
    numberOfSeats: '',
    pricePerDay: '',
    registrationNumber: '',
    vin: '',
    status: 'Avaliable',
    comments: ''
};

const CarStatusOptions: formSelectOptionProps[] = [
    {
        option: 'Dostępny',
        value: 'Avaliable',
    },
    {
        option: 'Wynajęty',
        value: 'Rented',
    },
    {
        option: 'Niesprawny',
        value: 'OutOfOrder',
    }];

const transmissionOptions: formSelectOptionProps[] = [
    {
        option: 'Automatyczna',
        value: 'Authomatic',
    },
    {
        option: 'Manualna',
        value: 'Manual',
    }];

const drivingLicenseCategories: formSelectOptionProps[] = [
    {
        option: 'AM',
        value: 'AM',
    },
    {
        option: 'A1',
        value: 'A1',
    },
    {
        option: 'A2',
        value: 'A2',
    },
    {
        option: 'A',
        value: 'A',
    },
    {
        option: 'B1',
        value: 'B1',
    },
    {
        option: 'B',
        value: 'B',
    },
    {
        option: 'C1',
        value: 'C1',
    },
    {
        option: 'C',
        value: 'C',
    },
    {
        option: 'D1',
        value: 'D1',
    },
    {
        option: 'D',
        value: 'D',
    },
    {
        option: 'BE',
        value: 'BE',
    },
    {
        option: 'C1E',
        value: 'C1E',
    },
    {
        option: 'CE',
        value: 'CE',
    },
    {
        option: 'D1E',
        value: 'D1E',
    },
    {
        option: 'DE',
        value: 'DE',
    },
    {
        option: 'T',
        value: 'T',
    },
];

const formValuesToCarProps = (formValues: formValuesProps): CarPutPostProps => {
    return {
        ...formValues,
        enginePower: parseInt(formValues.enginePower),
        pricePerDay: parseInt(formValues.pricePerDay),
        numberOfSeats: parseInt(formValues.numberOfSeats)
    };
};

const CarForm: React.FC<FormProps> = ({ initialformValues = initialFormState, method, carEditID }) => {
    const [formValues, setFormValues] = useState<formValuesProps>(initialformValues);
    const { postCar, putCar } = useCars();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatCar = formValuesToCarProps(formValues)
        console.log(formatCar);
        const response = await postCar(formatCar);
        if (isAxiosError(response)) {
            alert('niepoprawne dane!');
        } else {
            setFormValues(initialFormState);
            navigate('/cars');
        }
    };

    const handleEditCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (carEditID) {
            const formatCar = formValuesToCarProps(formValues)
            const response = await putCar(formatCar, carEditID);
            if (isAxiosError(response)) {
                alert('niepoprawne dane!');
            } else {
                setFormValues(initialFormState);
                navigate('/cars');
            }
        } else {
            alert('niepoprawne dane!');
        }
    };

    return (
        <ViewWrapper as="form" onSubmit={method === 'add' ? handleAddCar : handleEditCar}>
            <Title>{method === 'add' ? 'Dodaj nowy pojazd' : 'Edytuj dane pojazdu'}</Title>
            <FormField label="Marka" id="mark" name="mark" value={formValues.mark} onChange={handleInputChange} />
            <FormField label="Model" id="model" name="model" value={formValues.model} onChange={handleInputChange} />
            <FormField label="Numer Vin" id="vin" name="vin" value={formValues.vin} onChange={handleInputChange} />
            <FormField label="Numer rejestracyjny" id="registrationNumber" name="registrationNumber" value={formValues.registrationNumber} onChange={handleInputChange} />
            <FormFieldSelect options={drivingLicenseCategories} label="Kategoria" id="drivingLicenseCategory" name="drivingLicenseCategory" value={formValues.drivingLicenseCategory} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Moc" id="enginePower" name="enginePower" value={formValues.enginePower} onChange={handleInputChange} />
            <FormField label="Ilość miejsc" id="numberOfSeats" name="numberOfSeats" value={formValues.numberOfSeats} onChange={handleInputChange} />
            <FormField label="Cena /dzień" id="pricePerDay" name="pricePerDay" value={formValues.pricePerDay} onChange={handleInputChange} />
            <FormFieldSelect options={CarStatusOptions} label="Status pojazdu" id="status" name="status" value={formValues.status} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldSelect options={transmissionOptions} label="Skrzynia biegów" id="transmission" name="transmission" value={formValues.transmission} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Dodaj' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default CarForm;
