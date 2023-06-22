import React from 'react';
import styled from 'styled-components';
import Navigation from 'components/organisms/Navigation/Navigation';
import DataSection from '../DataSection/DataSection';

interface MainTemplateProps {
    children: React.ReactNode;
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`;

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
    return (
        <Wrapper>
            <Navigation />
            <DataSection />
            {children}
        </Wrapper>
    );
};

export default MainTemplate;