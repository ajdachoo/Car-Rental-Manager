import React from 'react';
import { StyledTr, StyledTd } from './ClientsTableRow.styles'
import { StyledButton } from 'components/atoms/Button/Button';
import { ClientProps } from 'hooks/useClients';
import { useNavigate } from 'react-router-dom';

interface ClientsTableRowProps {
    clientData: ClientProps;
    handleDeleteClient: Function;
    index: number;
}

const ClientTableRow: React.FC<ClientsTableRowProps> = ({ index, handleDeleteClient, clientData: { id, firstName, lastName, peselOrPassportNumber, email, phoneNumber, drivingLicenseCategory, isBlocked, comments } }) => {
    const navigate = useNavigate();

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
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
            <StyledTd><StyledButton onClick={() => navigate(`/editClient/${id}`)}>Edytuj</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default ClientTableRow;