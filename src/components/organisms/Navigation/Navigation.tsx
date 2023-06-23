import React from 'react';
import { Wrapper, Logo, HomeLink } from './Navigation.styles';
import { ReactComponent as HomeIcon } from 'assets/icons/house-solid.svg';
import { ReactComponent as NewIcon } from 'assets/icons/pen-to-square-solid.svg';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    font-size: ${({ theme }) => theme.fontSize.ml};
    font-weight: 700;
    border-bottom: solid 1px ${({ theme }) => theme.colors.c3};
    background-color: ${({ theme }) => theme.colors.c4};

    p {
        color: ${({ theme }) => theme.colors.c2};
        margin: 0 20px;
        margin-bottom: 30px;
    }
`;

const StyledNavLink = styled(NavLink)`
    height: 33px;
    padding: 0 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.c5};
    display: flex;
    gap: 20px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.c6};
    }

    svg {
        fill: ${({ theme }) => theme.colors.c5};
        height: ${({ theme }) => theme.fontSize.ml};
        padding: 0;
    }

    &.active {
        color: ${({ theme }) => theme.colors.c10};
        background-color: ${({ theme }) => theme.colors.c9};

        svg {
            fill: ${({ theme }) => theme.colors.c10};
        }
    }
`;

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
                <StyledNavLink to="/dupa0"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa1"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa2"><NewIcon />Dupa</StyledNavLink>
                <StyledNavLink to="/dupa3"><NewIcon />Dupa</StyledNavLink>
            </NavSection>
        </Wrapper>
    );
};

export default Navigation;
