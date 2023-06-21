import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/theme';
import { GlobalStyle } from '../assets/styles/GlobalStyle';

interface AppProvidersProps {
    children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default AppProviders;