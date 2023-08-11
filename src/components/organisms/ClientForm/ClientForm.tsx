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
    name: string;
    surname: string;
    peselOrPassportNumber: string;
    phoneNumber: string;
    email: string;
    isBlocked: string;
    drivingLicenseCategories: string;
    comments: string;
};

const initialFormState: formValuesProps = {
    name: '',
    surname: '',
    peselOrPassportNumber: '',
    phoneNumber: '',
    email: '',
    isBlocked: 'false',
    drivingLicenseCategories: '',
    comments: ''
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

const formValuesToClientProps = (formValues: formValuesProps): ClientPutPostProps => {
    return {
        ...formValues,
        isBlocked: (formValues.isBlocked === 'true'),
        drivingLicenseCategories: formValues.drivingLicenseCategories.split(','),
    };
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
            <FormField label="Imię" id="name" name="name" value={formValues.name} onChange={handleInputChange} />
            <FormField label="Nazwisko" id="surname" name="surname" value={formValues.surname} onChange={handleInputChange} />
            <FormField label="Nr paszportu/pesel" id="peselOrPassportNumber" name="peselOrPassportNumber" value={formValues.peselOrPassportNumber} onChange={handleInputChange} />
            <FormField type="email" label="Email" id="email" name="email" value={formValues.email} onChange={handleInputChange} />
            <FormField type="tel" label="Numer telefonu" id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} />
            <FormField label="Kategoria prawa jazdy" id="drivingLicenseCategories" name="drivingLicenseCategories" value={formValues.drivingLicenseCategories} onChange={handleInputChange} />
            <FormFieldSelect options={yesNoOptions} label="Zablokowany" id="isBlocked" name="isBlocked" value={formValues.isBlocked.toString()} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Dodaj' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default ClientForm;