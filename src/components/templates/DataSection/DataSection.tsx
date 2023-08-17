import CarsTable from 'components/organisms/CarsTable/CarsTable';
import ClientsTable from 'components/organisms/ClientsTable/ClientsTable';
import RentalsTable from 'components/organisms/RentalsTable/RentalsTable';
import React from 'react';
import { Wrapper } from './DataSection.styles';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientForm from 'components/organisms/ClientForm/ClientForm';
import CarForm from 'components/organisms/CarForm/CarForm';
import ClientEditForm from 'components/organisms/ClientEditForm/ClientEditForm';
import CarEditForm from 'components/organisms/CarEditForm/CarEditForm';
import RentalForm from 'components/organisms/RentalForm/RentalForm';
import RentalFinishForm from 'components/organisms/RentalFinishForm/RentalFinishForm';

const DataSection: React.FC = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path='/' element={<Navigate to='/rentals' replace />} />
                <Route path='/cars' element={<CarsTable />} />
                <Route path='/carsByStatus/:statusQueryParam' element={<CarsTable />} />
                <Route path='/addCar' element={<CarForm method='add' />} />
                <Route path='/editCar/:editCarID' element={<CarEditForm />} />
                <Route path='/clients' element={<ClientsTable />} />
                <Route path='/blockedClients/:isBlocked' element={<ClientsTable />} />
                <Route path='/addClient' element={<ClientForm method='add' />} />
                <Route path='/editClient/:editClientID' element={<ClientEditForm />} />
                <Route path='/rentals' element={<RentalsTable />} />
                <Route path='/addRental' element={<RentalForm />} />
                <Route path='/rentalsByStatus/:statusQueryParam' element={<RentalsTable />} />
                <Route path='/rentals/:rentalID/finish' element={<RentalFinishForm />} />
            </Routes>
        </Wrapper>
    );
};

export default DataSection;