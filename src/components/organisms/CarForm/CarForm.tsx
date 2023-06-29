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
    registrationNumber: string;
    vinNumer: string;
    mark: string;
    model: string;
    automaticTransmission: string;
    horsepower: string;
    countPlace: string;
    category: string;
    efficientNow: string;
    availableNow: string;
    priceForDay: string;
    comments: string;
};

const initialFormState: formValuesProps = {
    registrationNumber: '',
    vinNumer: '',
    mark: '',
    model: '',
    automaticTransmission: '',
    horsepower: '',
    countPlace: '',
    category: '',
    efficientNow: '',
    availableNow: '',
    priceForDay: '',
    comments: '',
};

const yesNoOptions: formSelectOptionProps[] = [
    {
        option: 'Tak',
        value: 'true',
    },
    {
        option: 'Nie',
        value: 'false',
    }];

const transmissionOptions: formSelectOptionProps[] = [
    {
        option: 'Automatyczna',
        value: 'true',
    },
    {
        option: 'Manualna',
        value: 'false',
    }];

const formValuesToCarProps = (formValues: formValuesProps): CarPutPostProps => {
    return {
        ...formValues,
        automaticTransmission: (formValues.automaticTransmission === 'true'),
        efficientNow: (formValues.efficientNow === 'true'),
        availableNow: (formValues.availableNow === 'true'),
        horsepower: parseInt(formValues.horsepower),
        countPlace: parseInt(formValues.countPlace),
        priceForDay: parseInt(formValues.priceForDay)
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
            <FormField label="Numer Vin" id="vinNumer" name="vinNumer" value={formValues.vinNumer} onChange={handleInputChange} />
            <FormField label="Numer rejestracyjny" id="registrationNumber" name="registrationNumber" value={formValues.registrationNumber} onChange={handleInputChange} />
            <FormField label="Kategoria" id="category" name="category" value={formValues.category} onChange={handleInputChange} />
            <FormField label="Moc" id="horsepower" name="horsepower" value={formValues.horsepower} onChange={handleInputChange} />
            <FormField label="Ilość miejsc" id="countPlace" name="countPlace" value={formValues.countPlace} onChange={handleInputChange} />
            <FormField label="Cena /dzień" id="priceForDay" name="priceForDay" value={formValues.priceForDay} onChange={handleInputChange} />
            <FormFieldSelect options={yesNoOptions} label="Sprawny" id="efficientNow" name="efficientNow" value={formValues.efficientNow.toString()} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldSelect options={yesNoOptions} label="Dostępny" id="availableNow" name="availableNow" value={formValues.availableNow.toString()} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldSelect options={transmissionOptions} label="Skrzynia biegów" id="automaticTransmission" name="automaticTransmission" value={formValues.automaticTransmission.toString()} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Dodaj' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default CarForm;