import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import RentalTableRow from 'components/molecules/RentalTableRow/RentalTableRow';
import { useRentals, RentalProps, RentalStatusEnum } from 'hooks/useRentals';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';
import { useParams } from 'react-router-dom';

const headers = ['#', 'ID', 'ID pojazdu', 'Marka', 'Model', 'Nr rejestracyjny', 'ID klienta', 'Imię', 'Nazwisko', 'Nr paszportu/pesel', 'Okres wypożyczenia', 'Status', 'Kwota', 'Komentarz'];

const RentalsTable: React.FC = () => {
    const [rentals, setRentals] = useState<RentalProps[]>();
    const status = 'Ładowanie...';
    const { getRentals, deleteRental } = useRentals();
    const { statusQueryParam } = useParams();

    useEffect(() => {
        fetchData();
    }, [statusQueryParam]);

    const fetchData = async () => {
        const rental = await getRentals(statusQueryParam as RentalStatusEnum);
        setRentals(rental);
    };

    const handleDeleteRental = async (id: number) => {
        await deleteRental(id);
        fetchData();
    };

    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {rentals ? rentals.map((rental, index) => (<RentalTableRow handleDeleteRental={handleDeleteRental} index={index} key={rental.id} rentalData={rental} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default RentalsTable;