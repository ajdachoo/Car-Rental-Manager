import React, { useEffect, useState } from 'react';
import DataTable from 'components/molecules/DataTable/DataTable';
import RentalTableRow from 'components/molecules/RentalTableRow/RentalTableRow';
import { useRentals, RentalProp } from 'hooks/useRentals';
import { ViewWrapper } from 'components/molecules/ViewWrapper/ViewWrapper.styles';

const headers = ['#', 'ID', 'ID pojazdu', 'Marka', 'Model', 'Nr rejestracyjny', 'ID klienta', 'Imię', 'Nazwisko', 'Nr paszportu/pesel', 'Okres wypożyczenia', 'Status', 'Kwota', 'Komentarz'];

const RentalsTable: React.FC = () => {
    const [rentals, setRentals] = useState<RentalProp[]>();
    const status = 'Ładowanie...';
    const { getRentals } = useRentals();

    useEffect(() => {
        (async () => {
            const rentals = await getRentals();
            setRentals(rentals);
        })();
    }, [getRentals]);

    return (
        <ViewWrapper>
            <DataTable tableHeaders={headers}>
                {rentals ? rentals.map((rental, index) => (<RentalTableRow index={index} key={rental.id} rentalData={rental} />)) : <tr><th>{status}</th></tr>}
            </DataTable>
        </ViewWrapper>
    );
};

export default RentalsTable;

/*"id": 0,
"carId": 0,
"carMark": "string",
"carModel": "string",
"registrationNumber": "string",
"clientId": 0,
"firstName": "string",
"lastName": "string",
"peselOrPassportNumber": "string",
"hireDate": "2023-06-24T18:03:50.280Z",
"expectedDateOfReturn": "2023-06-24T18:03:50.280Z",
"dateOfReturn": "2023-06-24T18:03:50.280Z",
"comment": "string" */

