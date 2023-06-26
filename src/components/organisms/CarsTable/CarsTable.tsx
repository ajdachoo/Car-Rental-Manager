import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import CarTableRow from 'components/molecules/CarTableRow/CarTableRow';
import { useCars, CarProp } from 'hooks/useCars';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';

const headers = ['#', 'ID', 'Marka', 'Model', 'Skrzynia Biegów', 'Moc', 'Kategoria', 'Ilość miejsc', 'Cena /dzień', 'Numer rejestracyjny', 'Numer Vin'];

const CarsTable: React.FC = () => {
    const [cars, setCars] = useState<CarProp[]>();
    const status = 'Ładowanie...';
    const { getCars, deleteCar } = useCars();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const clients = await getCars();
        setCars(clients);
    };

    const handleDeleteCar = async (id: number) => {
        await deleteCar(id);
        fetchData();
    };



    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {cars ? cars.map((car, index) => (<CarTableRow index={index} handleDeleteCar={handleDeleteCar} key={car.id} carData={car} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default CarsTable;