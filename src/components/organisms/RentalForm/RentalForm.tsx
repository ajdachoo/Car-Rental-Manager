import React, { useState } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldDate } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { RentalPutPostProps, useRentals } from "hooks/useRentals";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

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

const RentalForm: React.FC<FormProps> = ({ initialformValues = initialFormState, method, rentalEditID }) => {
    const [formValues, setFormValues] = useState<formValuesProps>(initialformValues);
    const { postRental, putRental } = useRentals();
    const navigate = useNavigate();

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
            <FormField label="CarID" id="carId" name="carId" value={formValues.carId} onChange={handleInputChange} />
            <FormField label="ClientID" id="clientId" name="clientId" value={formValues.clientId} onChange={handleInputChange} />
            <FormFieldDate label="Data od" id="hireDate" name="hireDate" value={formValues.hireDate} onChange={handleInputChange} />
            <FormFieldDate label="Data do" id="expectedDateOfReturn" name="expectedDateOfReturn" value={formValues.expectedDateOfReturn} onChange={handleInputChange} />
            <FormFieldDate label="Data zwrotu" id="dateOfReturn" name="dateOfReturn" value={formValues.dateOfReturn} onChange={handleInputChange} />
            <FormField label="Komentarz" id="comment" name="comment" value={formValues.comment} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Stwórz' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default RentalForm;