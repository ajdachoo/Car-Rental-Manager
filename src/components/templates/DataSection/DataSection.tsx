import CarsTable from 'components/organisms/CarsTable/CarsTable';
import ClientsTable from 'components/organisms/ClientsTable/ClientsTable';
import RentalsTable from 'components/organisms/RentalsTable/RentalsTable';
import React from 'react';
import { Wrapper } from './DataSection.styles';
import { Routes, Route } from 'react-router-dom';

const DataSection: React.FC = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path='/cars' element={<CarsTable />} />
                <Route path='/clients' element={<ClientsTable />} />
                <Route path='/rentals' element={<RentalsTable />} />
            </Routes>
        </Wrapper>
    );
};

export default DataSection;