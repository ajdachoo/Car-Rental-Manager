import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Logo = styled.div`
    color: ${({ theme }) => theme.colors.c2};
    background-color: ${({ theme }) => theme.colors.c4};
    border-bottom: solid 1px ${({ theme }) => theme.colors.c3};
    padding: 0 20px;

    h1 {
        font-size: ${({ theme }) => theme.fontSize.xl};
        text-align: center;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.c6};
    }

`;

export const Wrapper = styled.div`
    display: flex;
    min-width: 310px;
    flex-direction: column;
    height: 100vh;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.colors.c1};
`;

export const HomeLink = styled(NavLink)`
    height: 60px;
    font-size: ${({ theme }) => theme.fontSize.ml};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.c5};
    border-bottom: solid 1px ${({ theme }) => theme.colors.c3};
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px 20px;
    gap: 20px;
    text-decoration: none;
    
    svg {
        fill: ${({ theme }) => theme.colors.c5};
        height: ${({ theme }) => theme.fontSize.ml};
        padding: 0;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.c6};
    }
`;

export const NavSection = styled.div`
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

export const StyledNavLink = styled(NavLink)`
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