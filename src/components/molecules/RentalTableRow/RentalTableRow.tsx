import React from 'react';
import { StyledTr, StyledTd } from './RentalTableRow.styles'
import { RentalProps, RentalStatusEnum } from 'hooks/useRentals';
import { StyledButton } from 'components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';

interface RentalsTableRowProps {
    rentalData: RentalProps;
    index: number;
    handleDeleteRental: Function;
}

export const getFormatDate = (date: Date): string => {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
};

export const getFormatTime = (date: Date): string => {
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
};

const getDiffDate = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffhours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffhours;
};

const RentalTableRow: React.FC<RentalsTableRowProps> = ({ handleDeleteRental, index, rentalData: { id, car: { id: carId, mark, model, registrationNumber }, client: { id: clientId, name, surname, peselOrPassportNumber }, rentalDate, expectedDateOfReturn, dateOfReturn, comments, status, amount } }) => {
    const navigate = useNavigate();
    const hireDateFormat = new Date(rentalDate);
    const expectedDateOfReturnFormat = new Date(expectedDateOfReturn);
    const dateOfReturnFormat = new Date(dateOfReturn);
    const currentDate = new Date()

    const getStatusComponent = () => {
        switch (status) {
            case RentalStatusEnum.Delayed: return <StyledTd $status='warning'>Opóźnienie: {getDiffDate(currentDate, expectedDateOfReturnFormat) + ' h.'} </StyledTd>;
            case RentalStatusEnum.Active: return <StyledTd $status='inProgress'>W trakcie...</StyledTd>;
            case RentalStatusEnum.Finished: return <StyledTd $status='succes'>Zwrócono: {getFormatDate(dateOfReturnFormat) + ' ' + getFormatTime(dateOfReturnFormat)}</StyledTd>;
        };
    };

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            {/*<StyledTd>{id}</StyledTd>*/}
            {/*<StyledTd>{carId}</StyledTd>*/}
            <StyledTd>{mark}</StyledTd>
            <StyledTd>{model}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            {/*<StyledTd>{clientId}</StyledTd>*/}
            <StyledTd>{name}</StyledTd>
            <StyledTd>{surname}</StyledTd>
            <StyledTd>{peselOrPassportNumber}</StyledTd>
            <StyledTd>{getFormatDate(hireDateFormat) + ' ' + getFormatTime(hireDateFormat) + ' do ' + getFormatDate(expectedDateOfReturnFormat) + ' ' + getFormatTime(expectedDateOfReturnFormat)}</StyledTd>
            {getStatusComponent()}
            <StyledTd >{`${amount.toFixed(2)} zł.`}</StyledTd>
            <StyledTd >{comments}</StyledTd>
            <StyledTd>{status !== RentalStatusEnum.Finished ? <StyledButton onClick={() => navigate(`/rentals/${id}/finish`)}>Zakończ</StyledButton> : null}</StyledTd>
            <StyledTd><StyledButton onClick={() => handleDeleteRental(id)}>Usuń</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default RentalTableRow;