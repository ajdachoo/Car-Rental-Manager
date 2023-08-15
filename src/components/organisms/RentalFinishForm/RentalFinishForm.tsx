import { isAxiosError } from 'axios';
import { FormButton, Title } from 'components/molecules/FormField/Form.styles';
import { FormFieldDate, FormFieldTime } from 'components/molecules/FormField/FormField';
import { getFormatDate, getFormatTime } from 'components/molecules/RentalTableRow/RentalTableRow';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';
import { RentalFinishProps, useRentals } from 'hooks/useRentals';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface formValuesProps {
    returnTime: string;
    dateOfReturn: string;
}

const initialFormState: formValuesProps = {
    returnTime: getFormatTime(new Date()),
    dateOfReturn: getFormatDate(new Date())
}

const formValuesToRentalFinishProps = (formValues: formValuesProps): RentalFinishProps => {
    return {
        dateOfReturn: new Date(`${formValues.dateOfReturn},${formValues.returnTime}`).toISOString()
    };
};

const RentalFinishForm: React.FC = () => {
    const [formValues, setFormValues] = useState<formValuesProps>(initialFormState);
    const { getFinishRental } = useRentals();
    const navigate = useNavigate();
    const { rentalID } = useParams();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleFinishRental = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatRental = formValuesToRentalFinishProps(formValues)

        if (rentalID) {
            const response = await getFinishRental(parseInt(rentalID), formatRental);
            if (isAxiosError(response)) {
                alert('niepoprawne dane!');
            } else {
                navigate('/rentals');
            }
        } else {
            alert('niepoprawne dane!');
        }
    };

    return (
        <ViewWrapper as='form' onSubmit={handleFinishRental}>
            <Title>Zakończ wypożyczenie</Title>
            <FormFieldDate label="Data zwrotu" id="dateOfReturn" name="dateOfReturn" value={formValues.dateOfReturn} onChange={handleInputChange} />
            <FormFieldTime label="Godzina zwrotu" id="returnTime" name="returnTime" value={formValues.returnTime} onChange={handleInputChange} />
            <FormButton type='submit'>Zakończ</FormButton>
        </ViewWrapper>
    );
};

export default RentalFinishForm;