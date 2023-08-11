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

const ClientTableRow: React.FC<ClientsTableRowProps> = ({ index, handleDeleteClient, clientData: { id, name, surname, peselOrPassportNumber, email, phoneNumber, drivingLicenseCategories, isBlocked, comments } }) => {
    const navigate = useNavigate();

    const getStatusComponent = () => {
        return isBlocked ? <StyledTd $status='warning'>Zablokowany</StyledTd> : <StyledTd $status='succes'>OK</StyledTd>;
    };

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{name}</StyledTd>
            <StyledTd>{surname}</StyledTd>
            <StyledTd>{peselOrPassportNumber}</StyledTd>
            <StyledTd>{email}</StyledTd>
            <StyledTd>{phoneNumber}</StyledTd>
            <StyledTd>{drivingLicenseCategories.join(',')}</StyledTd>
            {getStatusComponent()}
            <StyledTd>{comments}</StyledTd>
            <StyledTd><StyledButton onClick={() => handleDeleteClient(id)}>Usuń</StyledButton></StyledTd>
            <StyledTd><StyledButton onClick={() => navigate(`/editClient/${id}`)}>Edytuj</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default ClientTableRow;