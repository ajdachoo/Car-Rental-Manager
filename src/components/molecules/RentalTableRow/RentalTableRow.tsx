import React from 'react';
import { StyledTr, StyledTd } from './RentalTableRow.styles'
import { RentalProp } from 'hooks/useRentals';

interface RentalsTableRowProps {
    rentalData: RentalProp;
    index: number;
}

const getFormatDate = (date: Date): string => {
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
};

const getDiffDate = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffhours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffhours;
};

const RentalTableRow: React.FC<RentalsTableRowProps> = ({ index, rentalData: { id, carId, carMark, carModel, registrationNumber, clientId, firstName, lastName, peselOrPassportNumber, hireDate, expectedDateOfReturn, dateOfReturn, comment, status, price } }) => {

    const hireDateFormat = new Date(hireDate);
    const expectedDateOfReturnFormat = new Date(expectedDateOfReturn);
    const dateOfReturnFormat = new Date(dateOfReturn);
    const currentDate = new Date()

    const getStatusComponent = () => {
        switch (status) {
            case -1: return <StyledTd $status='warning'>Opóźnienie: {getDiffDate(currentDate, expectedDateOfReturnFormat) + ' h.'} </StyledTd>;
            case 0: return <StyledTd $status='inProgress'>W trakcie...</StyledTd>;
            case 1: return <StyledTd $status='succes'>Zwrócono: {getFormatDate(dateOfReturnFormat)}</StyledTd>;
        };
    };

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{carId}</StyledTd>
            <StyledTd>{carMark}</StyledTd>
            <StyledTd>{carModel}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            <StyledTd>{clientId}</StyledTd>
            <StyledTd>{firstName}</StyledTd>
            <StyledTd>{lastName}</StyledTd>
            <StyledTd>{peselOrPassportNumber}</StyledTd>
            <StyledTd>{getFormatDate(hireDateFormat) + ' do ' + getFormatDate(expectedDateOfReturnFormat)}</StyledTd>
            <StyledTd>{getStatusComponent()}</StyledTd>
            <StyledTd >{`${price.toFixed(2)} zł.`}</StyledTd>
            <StyledTd >{comment}</StyledTd>
        </StyledTr>
    );
};

export default RentalTableRow;

/*"id": 0,
"carId": 0,
"carMark": "string",
"carModel": "string",
"registrationNumber": "string",
"clientId": 0,
"firstName": "string",
"lastName": "string",
"peselOrPassportNumber": "string",
"hireDate": "2023-06-24T18:03:50.280Z",
"expectedDateOfReturn": "2023-06-24T18:03:50.280Z",
"dateOfReturn": "2023-06-24T18:03:50.280Z",
"comment": "string" */