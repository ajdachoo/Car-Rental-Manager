import React, { useState } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldSelect, formSelectOptionProps } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { ClientPutPostProps, useClients } from "hooks/useClients";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { DrivingLicenseCategoriesEnum } from "hooks/useCars";

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

const statusOptions: formSelectOptionProps[] = [
    {
        option: 'OK',
        value: 'false',
    },
    {
        option: 'Zablokowany',
        value: 'true',
    }];

const drivingLicenseCategories: formSelectOptionProps[] = [
    {
        option: DrivingLicenseCategoriesEnum.AM,
        value: DrivingLicenseCategoriesEnum.AM,
    },
    {
        option: DrivingLicenseCategoriesEnum.A1,
        value: DrivingLicenseCategoriesEnum.A1,
    },
    {
        option: DrivingLicenseCategoriesEnum.A2,
        value: DrivingLicenseCategoriesEnum.A2,
    },
    {
        option: DrivingLicenseCategoriesEnum.A,
        value: DrivingLicenseCategoriesEnum.A,
    },
    {
        option: DrivingLicenseCategoriesEnum.B1,
        value: DrivingLicenseCategoriesEnum.B1,
    },
    {
        option: DrivingLicenseCategoriesEnum.B,
        value: DrivingLicenseCategoriesEnum.B,
    },
    {
        option: DrivingLicenseCategoriesEnum.C1,
        value: DrivingLicenseCategoriesEnum.C1,
    },
    {
        option: DrivingLicenseCategoriesEnum.C,
        value: DrivingLicenseCategoriesEnum.C,
    },
    {
        option: DrivingLicenseCategoriesEnum.D1,
        value: DrivingLicenseCategoriesEnum.D1,
    },
    {
        option: DrivingLicenseCategoriesEnum.D,
        value: DrivingLicenseCategoriesEnum.D,
    },
    {
        option: DrivingLicenseCategoriesEnum.BE,
        value: DrivingLicenseCategoriesEnum.BE,
    },
    {
        option: DrivingLicenseCategoriesEnum.C1E,
        value: DrivingLicenseCategoriesEnum.C1E,
    },
    {
        option: DrivingLicenseCategoriesEnum.CE,
        value: DrivingLicenseCategoriesEnum.CE,
    },
    {
        option: DrivingLicenseCategoriesEnum.D1E,
        value: DrivingLicenseCategoriesEnum.D1E,
    },
    {
        option: DrivingLicenseCategoriesEnum.DE,
        value: DrivingLicenseCategoriesEnum.DE,
    },
    {
        option: DrivingLicenseCategoriesEnum.T,
        value: DrivingLicenseCategoriesEnum.T,
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
            <FormFieldSelect options={statusOptions} label="Status" id="isBlocked" name="isBlocked" value={formValues.isBlocked.toString()} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Dodaj' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default ClientForm;