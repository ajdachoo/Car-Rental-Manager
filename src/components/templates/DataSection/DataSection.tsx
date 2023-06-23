import CarsTable from 'components/organisms/CarsTable/CarsTable';
import React from 'react';
import { Wrapper } from './DataSection.styles';

const DataSection: React.FC = () => {
    return (
        <Wrapper>
            <CarsTable />
        </Wrapper>
    );
};

export default DataSection;