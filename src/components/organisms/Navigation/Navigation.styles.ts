import styled from "styled-components";

export const Logo = styled.div`
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

export const Wrapper = styled.div`
    display: flex;
    min-width: 290px;
    flex-direction: column;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.c1};
`;

export const HomeLink = styled.div`
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