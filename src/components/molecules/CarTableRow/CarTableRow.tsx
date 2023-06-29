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

const CarTableRow: React.FC<CarTableRowProps> = ({ index, handleDeleteCar, carData: { id, mark, model, automaticTransmission, horsepower, category, countPlace, priceForDay, registrationNumber, vinNumer } }) => {
    const navigate = useNavigate();

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{mark}</StyledTd>
            <StyledTd>{model}</StyledTd>
            <StyledTd>{automaticTransmission ? 'automatyczna' : 'manualna'}</StyledTd>
            <StyledTd>{`${horsepower} KM`}</StyledTd>
            <StyledTd>{category}</StyledTd>
            <StyledTd>{countPlace}</StyledTd>
            <StyledTd>{`${priceForDay.toFixed(2)} zł.`}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            <StyledTd>{vinNumer}</StyledTd>
            <StyledTd><StyledButton onClick={() => handleDeleteCar(id)}>Usuń</StyledButton></StyledTd>
            <StyledTd><StyledButton onClick={() => navigate(`/editCar/${id}`)}>Edytuj</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default CarTableRow;