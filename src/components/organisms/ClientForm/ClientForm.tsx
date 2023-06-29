import React, { useState } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldSelect, formSelectOptionProps } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { ClientPutPostProps, useClients } from "hooks/useClients";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

interface FormProps {
    initialformValues?: formValuesProps;
    method: 'add' | 'edit';
    clientEditID?: number;
};

export interface formValuesProps {
    firstName: string;
    lastName: string;
    peselOrPassportNumber: string;
    email: string;
    phoneNumber: string;
    drivingLicenseCategory: string;
    isBlocked: string;
    comments: string;
};

const initialFormState: formValuesProps = {
    firstName: '',
    lastName: '',
    peselOrPassportNumber: '',
    email: '',
    phoneNumber: '',
    drivingLicenseCategory: '',
    isBlocked: 'false',
    comments: '',
};

const BlockedOptions: formSelectOptionProps[] = [
    {
        option: 'Tak',
        value: 'true',
    },
    {
        option: 'Nie',
        value: 'false',
    }];

const formValuesToClientProps = (formValues: formValuesProps): ClientPutPostProps => {
    return { ...formValues, isBlocked: (formValues.isBlocked === 'true') };
};


const ClientForm: React.FC<FormProps> = ({ initialformValues = initialFormState, method, clientEditID }) => {
    const [formValues, setFormValues] = useState<formValuesProps>(initialformValues);
    const { postClient, putClient } = useClients();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
        console.log(formValues);
    };

    const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatclient = formValuesToClientProps(formValues)
        const response = await postClient(formatclient);
        if (isAxiosError(response)) {
            alert('niepoprawne dane!');
        } else {
            setFormValues(initialFormState);
            navigate('/clients');
        }
    };

    const handleEditClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (clientEditID) {
            const formatclient = formValuesToClientProps(formValues)
            const response = await putClient(formatclient, clientEditID);
            if (isAxiosError(response)) {
                alert('niepoprawne dane!');
            } else {
                setFormValues(initialFormState);
                navigate('/clients');
            }
        } else {
            alert('niepoprawne dane!');
        }
    };

    return (
        <ViewWrapper as="form" onSubmit={method === 'add' ? handleAddClient : handleEditClient}>
            <Title>{method === 'add' ? 'Dodaj nowego klienta' : 'Edytuj dane klienta'}</Title>
            <FormField label="Imię" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} />
            <FormField label="Nazwisko" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} />
            <FormField label="Nr paszportu/pesel" id="peselOrPassportNumber" name="peselOrPassportNumber" value={formValues.peselOrPassportNumber} onChange={handleInputChange} />
            <FormField type="email" label="Email" id="email" name="email" value={formValues.email} onChange={handleInputChange} />
            <FormField type="tel" label="Numer telefonu" id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} />
            <FormField label="Kategoria prawa jazdy" id="drivingLicenseCategory" name="drivingLicenseCategory" value={formValues.drivingLicenseCategory} onChange={handleInputChange} />
            <FormFieldSelect options={BlockedOptions} label="Zablokowany" id="isBlocked" name="isBlocked" value={formValues.isBlocked.toString()} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Dodaj' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default ClientForm;