import React from 'react';
import { StyledButton } from 'components/atoms/Button/Button';
import { StyledTr, StyledTd } from './CarTableRow.styles'
import { CarProps } from 'hooks/useCars';
import { useNavigate } from 'react-router-dom';

interface CarTableRowProps {
    carData: CarProps;
    handleDeleteCar: Function;
    index: number;
}

const CarTableRow: React.FC<CarTableRowProps> = ({ index, handleDeleteCar, carData: { id, mark, model, transmission, enginePower, drivingLicenseCategory, numberOfSeats, pricePerDay, registrationNumber, vin, status } }) => {
    const navigate = useNavigate();

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{mark}</StyledTd>
            <StyledTd>{model}</StyledTd>
            <StyledTd>{transmission}</StyledTd>
            <StyledTd>{`${enginePower} KM`}</StyledTd>
            <StyledTd>{drivingLicenseCategory}</StyledTd>
            <StyledTd>{numberOfSeats}</StyledTd>
            <StyledTd>{`${pricePerDay.toFixed(2)} zł.`}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            <StyledTd>{vin}</StyledTd>
            <StyledTd>{status}</StyledTd>
            <StyledTd><StyledButton onClick={() => handleDeleteCar(id)}>Usuń</StyledButton></StyledTd>
            <StyledTd><StyledButton onClick={() => navigate(`/editCar/${id}`)}>Edytuj</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default CarTableRow;