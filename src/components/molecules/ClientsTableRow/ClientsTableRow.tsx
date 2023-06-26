import React from 'react';
import { StyledTr, StyledTd } from './ClientsTableRow.styles'
import { StyledButton } from 'components/atoms/Button/Button';
import { ClientProp } from 'hooks/useClients';

interface ClientsTableRowProps {
    clientData: ClientProp;
    handleDeleteClient: Function;
}

const ClientTableRow: React.FC<ClientsTableRowProps> = ({ handleDeleteClient, clientData: { id, firstName, lastName, peselOrPassportNumber, email, phoneNumber, drivingLicenseCategory, isBlocked, comments } }) => {

    return (
        <StyledTr>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{firstName}</StyledTd>
            <StyledTd>{lastName}</StyledTd>
            <StyledTd>{peselOrPassportNumber}</StyledTd>
            <StyledTd>{email}</StyledTd>
            <StyledTd>{phoneNumber}</StyledTd>
            <StyledTd>{drivingLicenseCategory}</StyledTd>
            <StyledTd>{isBlocked ? 'Tak' : 'Nie'}</StyledTd>
            <StyledTd>{comments}</StyledTd>
            <StyledTd><StyledButton onClick={() => handleDeleteClient(id)}>Usuń</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default ClientTableRow;