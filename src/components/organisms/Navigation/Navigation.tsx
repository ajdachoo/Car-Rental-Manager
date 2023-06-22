import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HomeIcon } from 'assets/icons/house-solid.svg';

const Logo = styled.div`
    color: ${({ theme }) => theme.colors.c2};
    background-color: ${({ theme }) => theme.colors.c4};
    border-bottom: solid 2px ${({ theme }) => theme.colors.c3};
    padding: 0 20px;

    h1 {
        font-size: ${({ theme }) => theme.fontSize.xl};
        text-align: center;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.c6};
    }

`;

const Wrapper = styled.div`
    display: flex;
    min-width: 290px;
    flex-direction: column;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.c1};
`;

const HomeLink = styled.div`
    height: 60px;
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.c5};
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px 20px;
    gap: 20px;
    
    svg {
        fill: ${({ theme }) => theme.colors.c5};
        height: ${({ theme }) => theme.fontSize.l};
        padding: 0;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.c6};
    }
`;

const Navigation: React.FC = () => {
    return (
        <Wrapper>
            <Logo>
                <h1>Car Rental Manager</h1>
            </Logo>
            <HomeLink>
                <HomeIcon /><p>Home</p>
            </HomeLink>
        </Wrapper>
    );
};

export default Navigation;
