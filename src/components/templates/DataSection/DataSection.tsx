import CarsTable from 'components/organisms/CarsTable/CarsTable';
import ClientsTable from 'components/organisms/ClientsTable/ClientsTable';
import RentalsTable from 'components/organisms/RentalsTable/RentalsTable';
import React from 'react';
import { Wrapper } from './DataSection.styles';
import { Routes, Route } from 'react-router-dom';
import ClientForm from 'components/organisms/ClientForm/ClientForm';
import CarForm from 'components/organisms/CarForm/CarForm';
import ClientEditForm from 'components/organisms/ClientEditForm/ClientEditForm';
import CarEditForm from 'components/organisms/CarEditForm/CarEditForm';
import RentalForm from 'components/organisms/RentalForm/RentalForm';

const DataSection: React.FC = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path='/cars' element={<CarsTable />} />
                <Route path='/clients' element={<ClientsTable />} />
                <Route path='/rentals' element={<RentalsTable />} />
                <Route path='/addRental' element={<RentalForm />} />
                <Route path='/addClient' element={<ClientForm method='add' />} />
                <Route path='/editClient/:editClientID' element={<ClientEditForm />} />
                <Route path='/addCar' element={<CarForm method='add' />} />
                <Route path='/editCar/:editCarID' element={<CarEditForm />} />
            </Routes>
        </Wrapper>
    );
};

export default DataSection;