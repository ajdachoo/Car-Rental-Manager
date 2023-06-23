import React from 'react';
import { Wrapper } from './MainTemplate.styles';
import Navigation from 'components/organisms/Navigation/Navigation';
import DataSection from '../DataSection/DataSection';

interface MainTemplateProps {
    children: React.ReactNode;
}

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