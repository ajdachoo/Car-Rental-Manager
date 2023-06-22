import CarsTable from 'components/organisms/CarsTable/CarsTable';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.c7};
`;

const DataSection: React.FC = () => {
    return (
        <Wrapper>
            <CarsTable />
        </Wrapper>
    );
};

export default DataSection;