import React from 'react';
import { StyledButton } from 'components/atoms/Button/Button';
import { StyledTr, StyledTd } from './CarTableRow.styles'
import { CarProps, CarStatusEnum, TransmissionEnum } from 'hooks/useCars';
import { useNavigate } from 'react-router-dom';

interface CarTableRowProps {
    carData: CarProps;
    handleDeleteCar: Function;
    index: number;
}

const CarTableRow: React.FC<CarTableRowProps> = ({ index, handleDeleteCar, carData: { id, mark, model, transmission, enginePower, drivingLicenseCategory, numberOfSeats, pricePerDay, registrationNumber, vin, status } }) => {
    const navigate = useNavigate();

    const getTransmissionComponent = () => {
        switch (transmission) {
            case TransmissionEnum.Authomatic: return <StyledTd>Automatyczna</StyledTd>;
            case TransmissionEnum.Manual: return <StyledTd>Manualna</StyledTd>;
        };
    };

    const getCarStatusComponent = () => {
        switch (status) {
            case CarStatusEnum.Avaliable: return <StyledTd $status='succes'>Dostępny</StyledTd>;
            case CarStatusEnum.InService: return <StyledTd $status='inProgress'>Serwisowany</StyledTd>;
            case CarStatusEnum.OutOfOrder: return <StyledTd $status='warning'>Niesprawny</StyledTd>;
            case CarStatusEnum.Rented: return <StyledTd $status='inProgress'>Wynajęty</StyledTd>;
        };
    };

    return (
        <StyledTr>
            <StyledTd>{`${index + 1}.`}</StyledTd>
            {/*<StyledTd>{id}</StyledTd>*/}
            <StyledTd>{mark}</StyledTd>
            <StyledTd>{model}</StyledTd>
            {getTransmissionComponent()}
            <StyledTd>{`${enginePower} KM`}</StyledTd>
            <StyledTd>{drivingLicenseCategory}</StyledTd>
            <StyledTd>{numberOfSeats}</StyledTd>
            <StyledTd>{`${pricePerDay.toFixed(2)} zł.`}</StyledTd>
            <StyledTd>{registrationNumber}</StyledTd>
            <StyledTd>{vin}</StyledTd>
            {getCarStatusComponent()}
            <StyledTd><StyledButton onClick={() => handleDeleteCar(id)}>Usuń</StyledButton></StyledTd>
            <StyledTd><StyledButton onClick={() => navigate(`/editCar/${id}`)}>Edytuj</StyledButton></StyledTd>
        </StyledTr>
    );
};

export default CarTableRow;