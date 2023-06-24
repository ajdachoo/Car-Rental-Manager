import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import CarTableRow from 'components/molecules/CarTableRow/CarTableRow';
import { useCars, CarProp } from 'hooks/useCars';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';

const headers = ['ID', 'Marka', 'Model', 'Skrzynia Biegów', 'Moc', 'Kategoria', 'Ilość miejsc', 'Cena /dzień', 'Numer rejestracyjny', 'Numer Vin'];

const CarsTable: React.FC = () => {
    const [cars, setCars] = useState<CarProp[]>();
    const status = 'Ładowanie...';
    const { getCars } = useCars();

    useEffect(() => {
        (async () => {
            const cars = await getCars();
            setCars(cars);
        })();
    }, [getCars]);

    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {cars ? cars.map((car) => (<CarTableRow key={car.id} carData={car} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default CarsTable;