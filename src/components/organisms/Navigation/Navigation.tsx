import React from 'react';
import { Wrapper, Logo, HomeLink, NavSection, StyledNavLink } from './Navigation.styles';
import { ReactComponent as HomeIcon } from 'assets/icons/house-solid.svg';
import { ReactComponent as NewIcon } from 'assets/icons/pen-to-square-solid.svg';
import { ReactComponent as TableListIcon } from 'assets/icons/table-list-solid.svg';

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
                <StyledNavLink to="/cars"><TableListIcon />Tabela pojazdów</StyledNavLink>
                <StyledNavLink to="/addCar"><NewIcon />Dodaj nowy pojazd</StyledNavLink>
            </NavSection>
            <NavSection>
                <p>Klienci</p>
                <StyledNavLink to="/clients"><TableListIcon />Tabela klientów</StyledNavLink>
                <StyledNavLink to="/addClient"><NewIcon />Dodaj nowego klienta</StyledNavLink>
            </NavSection>
            <NavSection>
                <p>Wypożyczenia</p>
                <StyledNavLink to="/rentals"><TableListIcon />Tabela wypożyczeń</StyledNavLink>
                <StyledNavLink to="/addRental"><NewIcon />Stwórz wypożyczenie</StyledNavLink>
            </NavSection>
        </Wrapper>
    );
};

export default Navigation;
