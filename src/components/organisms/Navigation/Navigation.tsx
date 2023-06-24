import React from 'react';
import { Wrapper, Logo, HomeLink, NavSection, StyledNavLink } from './Navigation.styles';
import { ReactComponent as HomeIcon } from 'assets/icons/house-solid.svg';
import { ReactComponent as NewIcon } from 'assets/icons/pen-to-square-solid.svg';

const Navigation: React.FC = () => {
    return (
        <Wrapper>
            <Logo>
                <h1>Car Rental Manager</h1>
            </Logo>
            <HomeLink to="/">
                <HomeIcon /><p>Home</p>
            </HomeLink>
            <NavSection>
                <p>Pojazdy</p>
                <StyledNavLink to="/cars"><NewIcon />Tabela pojazdów</StyledNavLink>
                <StyledNavLink to="/dupa1"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa2"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa3"><NewIcon />Dupa</StyledNavLink>
            </NavSection>
            <NavSection>
                <p>Klienci</p>
                <StyledNavLink to="/clients"><NewIcon />Tabela klientów</StyledNavLink>
                <StyledNavLink to="/dupa1"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa2"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa3"><NewIcon />Dupa</StyledNavLink>
            </NavSection>
        </Wrapper>
    );
};

export default Navigation;
