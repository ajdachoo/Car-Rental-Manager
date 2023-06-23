import React from 'react';
import { StyledTr, StyledTd } from './CarTableRow.styles'
import { CarProp } from 'hooks/useCars';

interface CarTableRowProps {
    carData: CarProp;
}

const CarTableRow: React.FC<CarTableRowProps> = ({ carData: { id, mark, model, automaticTransmission, horsepower, category, countPlace, priceForDay, registrationNumber, vinNumer } }) => {
    return (
        <StyledTr>
            <StyledTd>{id}</StyledTd>
            <StyledTd>{mark}</StyledTd>
            <StyledTd>{model}</StyledTd>
            <StyledTd>{automaticTransmission ? 'automatyczna' : 'manualna'}</StyledTd>
            <StyledTd>{horsepower}</StyledTd>
            <StyledTd>{category}</StyledTd>
            <StyledTd>{countPlace}</StyledTd>
            <StyledTd>{priceForDay}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            <StyledTd>{vinNumer}</StyledTd>
        </StyledTr>
    );
};

export default CarTableRow;