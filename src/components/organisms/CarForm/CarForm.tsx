import React, { useState } from "react";
import { ViewWrapper } from "components/molecules/ViewWrapper/ViewWrapper.styles";
import { Title } from "components/molecules/FormField/Form.styles";
import { FormField, FormFieldSelect, formSelectOptionProps } from "components/molecules/FormField/FormField";
import { FormButton } from "components/molecules/FormField/Form.styles";
import { CarPutPostProps, CarStatusEnum, DrivingLicenseCategoriesEnum, TransmissionEnum, useCars } from "hooks/useCars";
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
    transmission: TransmissionEnum,
    enginePower: string,
    drivingLicenseCategory: DrivingLicenseCategoriesEnum,
    numberOfSeats: string,
    pricePerDay: string,
    registrationNumber: string,
    vin: string,
    status: CarStatusEnum,
    comments: string
};

const initialFormState: formValuesProps = {
    mark: '',
    model: '',
    transmission: TransmissionEnum.Authomatic,
    enginePower: '',
    drivingLicenseCategory: DrivingLicenseCategoriesEnum.AM,
    numberOfSeats: '',
    pricePerDay: '',
    registrationNumber: '',
    vin: '',
    status: CarStatusEnum.Avaliable,
    comments: ''
};

const CarStatusOptions: formSelectOptionProps[] = [
    {
        option: 'Dostępny',
        value: CarStatusEnum.Avaliable,
    },
    {
        option: 'Niesprawny',
        value: CarStatusEnum.OutOfOrder,
    },
    {
        option: 'Serwisowany',
        value: CarStatusEnum.InService
    }];

const transmissionOptions: formSelectOptionProps[] = [
    {
        option: 'Automatyczna',
        value: TransmissionEnum.Authomatic,
    },
    {
        option: 'Manualna',
        value: TransmissionEnum.Manual,
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

const formValuesToCarProps = (formValues: formValuesProps): CarPutPostProps => {
    return {
        ...formValues,
        enginePower: parseInt(formValues.enginePower),
        pricePerDay: parseInt(formValues.pricePerDay),
        numberOfSeats: parseInt(formValues.numberOfSeats),
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
            <FormField isRequired label="Marka" id="mark" name="mark" value={formValues.mark} onChange={handleInputChange} />
            <FormField isRequired label="Model" id="model" name="model" value={formValues.model} onChange={handleInputChange} />
            <FormField isRequired label="Numer Vin" id="vin" name="vin" value={formValues.vin} onChange={handleInputChange} />
            <FormField isRequired label="Numer rejestracyjny" id="registrationNumber" name="registrationNumber" value={formValues.registrationNumber} onChange={handleInputChange} />
            <FormFieldSelect isRequired options={drivingLicenseCategories} label="Kategoria" id="drivingLicenseCategory" name="drivingLicenseCategory" value={formValues.drivingLicenseCategory} onChange={handleInputChange}></FormFieldSelect>
            <FormField isRequired label="Moc" id="enginePower" name="enginePower" value={formValues.enginePower} onChange={handleInputChange} />
            <FormField isRequired label="Ilość miejsc" id="numberOfSeats" name="numberOfSeats" value={formValues.numberOfSeats} onChange={handleInputChange} />
            <FormField isRequired label="Cena /dzień" id="pricePerDay" name="pricePerDay" value={formValues.pricePerDay} onChange={handleInputChange} />
            <FormFieldSelect isRequired options={CarStatusOptions} label="Status pojazdu" id="status" name="status" value={formValues.status} onChange={handleInputChange}></FormFieldSelect>
            <FormFieldSelect isRequired options={transmissionOptions} label="Skrzynia biegów" id="transmission" name="transmission" value={formValues.transmission} onChange={handleInputChange}></FormFieldSelect>
            <FormField label="Komentarz" id="comments" name="comments" value={formValues.comments} onChange={handleInputChange} />
            <FormButton type="submit">{method === 'add' ? 'Dodaj' : 'Zatwierdź'}</FormButton>
        </ViewWrapper>
    );
};

export default CarForm;
