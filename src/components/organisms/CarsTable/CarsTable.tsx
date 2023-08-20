import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import CarTableRow from 'components/molecules/CarTableRow/CarTableRow';
import { useCars, CarProps, CarStatusEnum } from 'hooks/useCars';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';
import { useParams } from 'react-router-dom';

const headers = ['#', 'Marka', 'Model', 'Skrzynia Biegów', 'Moc', 'Kategoria', 'Ilość miejsc', 'Cena /dzień', 'Numer rejestracyjny', 'Numer Vin', 'Status'];
//const headers = ['#', 'ID', 'Marka', 'Model', 'Skrzynia Biegów', 'Moc', 'Kategoria', 'Ilość miejsc', 'Cena /dzień', 'Numer rejestracyjny', 'Numer Vin', 'Status'];

const CarsTable: React.FC = () => {
    const [cars, setCars] = useState<CarProps[]>();
    const [status, setStatus] = useState('');
    const { getCars, deleteCar } = useCars();
    const { statusQueryParam } = useParams();

    useEffect(() => {
        fetchData();
    }, [statusQueryParam, getCars]);

    const fetchData = async () => {
        setStatus('Ładowanie...');
        const cars = await getCars(statusQueryParam as CarStatusEnum);
        if (cars?.length === 0 || !cars) {
            setStatus('Brak');
            return;
        }
        setCars(cars);
        setStatus('');
    };

    const handleDeleteCar = async (id: number) => {
        await deleteCar(id);
        fetchData();
    };

    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {status === '' && cars ? cars.map((car, index) => (<CarTableRow index={index} handleDeleteCar={handleDeleteCar} key={car.id} carData={car} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default CarsTable;