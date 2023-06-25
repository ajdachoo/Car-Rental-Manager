import styled from "styled-components";

export const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.c11};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.c2};
    border: none;
    border-radius: 8px;
    padding: 6px 16px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.c12};
        box-shadow: ${({ theme }) => theme.shadows.s1};
    }
`;