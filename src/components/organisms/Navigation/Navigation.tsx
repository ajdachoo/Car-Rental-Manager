import React from 'react';
import { Wrapper, Logo, HomeLink, NavSection, StyledNavLink } from './Navigation.styles';
import { ReactComponent as HomeIcon } from 'assets/icons/house-solid.svg';
import { ReactComponent as NewIcon } from 'assets/icons/pen-to-square-solid.svg';
import { ReactComponent as TableListIcon } from 'assets/icons/table-list-solid.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check-solid.svg';
import { ReactComponent as WrenchIcon } from 'assets/icons/screwdriver-wrench-solid.svg';
import { ReactComponent as XMarkIcon } from 'assets/icons/xmark-solid.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock-regular.svg';
import { ReactComponent as ExclamationTriangleIcon } from 'assets/icons/triangle-exclamation-solid.svg';
import { ReactComponent as SpinnerIcon } from 'assets/icons/spinner-solid.svg';

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
                <StyledNavLink to="/cars"><TableListIcon />Wszystkie</StyledNavLink>
                <StyledNavLink to="/addCar"><NewIcon />Dodaj nowy</StyledNavLink>
                <StyledNavLink to="/cars"><CheckIcon />Dostępne</StyledNavLink>
                <StyledNavLink to="/cars"><SpinnerIcon />Wypożyczone</StyledNavLink>
                <StyledNavLink to="/cars"><ExclamationTriangleIcon />Niesprawne</StyledNavLink>
                <StyledNavLink to="/cars"><WrenchIcon />Serwisowane</StyledNavLink>
            </NavSection>
            <NavSection>
                <p>Klienci</p>
                <StyledNavLink to="/clients"><TableListIcon />Wszyscy</StyledNavLink>
                <StyledNavLink to="/addClient"><NewIcon />Dodaj nowego</StyledNavLink>
                <StyledNavLink to="/blockedClients/true"><XMarkIcon />Zablokowani</StyledNavLink>
            </NavSection>
            <NavSection>
                <p>Wypożyczenia</p>
                <StyledNavLink to="/rentals"><TableListIcon />Wszystkie</StyledNavLink>
                <StyledNavLink to="/addRental"><NewIcon />Stwórz nowe</StyledNavLink>
                <StyledNavLink to="/rentalsByStatus/Active"><SpinnerIcon />Aktywne</StyledNavLink>
                <StyledNavLink to="/rentalsByStatus/Delayed"><ClockIcon />Opóźnione</StyledNavLink>
                <StyledNavLink to="/rentalsByStatus/Finished"><CheckIcon />Zakończone</StyledNavLink>
            </NavSection>
        </Wrapper>
    );
};

export default Navigation;
