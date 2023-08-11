import React from 'react';
import { StyledTr, StyledTd } from './RentalTableRow.styles'
import { RentalProps } from 'hooks/useRentals';
import { StyledButton } from 'components/atoms/Button/Button';

interface RentalsTableRowProps {
    rentalData: RentalProps;
    index: number;
    handleDeleteRental: Function;
}

const getFormatDate = (date: Date): string => {
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
};

const getDiffDate = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffhours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffhours;
};

const RentalTableRow: React.FC<RentalsTableRowProps> = ({ handleDeleteRental, index, rentalData: { id, car: { id: carId, mark, model, registrationNumber }, client: { id: clientId, name, surname, peselOrPassportNumber }, rentalDate, expectedDateOfReturn, dateOfReturn, comments, status, amount } }) => {

    const hireDateFormat = new Date(rentalDate);
    const expectedDateOfReturnFormat = new Date(expectedDateOfReturn);
    const dateOfReturnFormat = new Date(dateOfReturn);
    const currentDate = new Date()

    /*const getStatusComponent = () => {
        switch (status) {
            case -1: return <StyledTd $status='warning'>Opóźnienie: {getDiffDate(currentDate, expectedDateOfReturnFormat) + ' h.'} </StyledTd>;
            case 0: return <StyledTd $status='inProgress'>W trakcie...</StyledTd>;
            case 1: return <StyledTd $status='succes'>Zwrócono: {getFormatDate(dateOfReturnFormat)}</StyledTd>;
        };
    }; */

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{carId}</StyledTd>
            <StyledTd>{mark}</StyledTd>
            <StyledTd>{model}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            <StyledTd>{clientId}</StyledTd>
            <StyledTd>{name}</StyledTd>
            <StyledTd>{surname}</StyledTd>
            <StyledTd>{peselOrPassportNumber}</StyledTd>
            <StyledTd>{getFormatDate(hireDateFormat) + ' do ' + getFormatDate(expectedDateOfReturnFormat)}</StyledTd>
            <StyledTd>{status}</StyledTd>
            <StyledTd >{`${amount.toFixed(2)} zł.`}</StyledTd>
            <StyledTd >{comments}</StyledTd>
            <StyledTd><StyledButton onClick={() => handleDeleteRental(id)}>Usuń</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default RentalTableRow;