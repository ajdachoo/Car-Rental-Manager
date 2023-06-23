import React from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import CarTableRow from 'components/molecules/CarTableRow/CarTableRow';
import { cars } from 'hooks/useCars';

const headers = ['ID', 'Marka', 'Model', 'Skrzynia Biegów', 'Moc', 'Kategoria', 'Ilość miejsc', 'Cena /dzień', 'Numer rejestracyjny', 'Numer Vin'];

const CarsTable: React.FC = () => {

    return (
        <DataTable tableHeaders={headers}>
            {cars.map((car) => (<CarTableRow key={car.id} carData={car} />))}
        </DataTable>
    );
};

export default CarsTable;