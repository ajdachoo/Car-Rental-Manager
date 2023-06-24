import CarsTable from 'components/organisms/CarsTable/CarsTable';
import ClientsTable from 'components/organisms/ClientsTable/ClientsTable';
import React from 'react';
import { Wrapper } from './DataSection.styles';
import { Routes, Route } from 'react-router-dom';

const DataSection: React.FC = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path='/cars' element={<CarsTable />} />
                <Route path='/clients' element={<ClientsTable />} />
            </Routes>
        </Wrapper>
    );
};

export default DataSection;