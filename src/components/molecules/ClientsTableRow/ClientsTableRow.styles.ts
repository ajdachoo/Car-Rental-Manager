import styled from "styled-components";

export const StyledTd = styled.td`
    padding: 10px;
    text-align: left;
`;

export const StyledTr = styled.tr`
    border-bottom: solid 2px ${({ theme }) => theme.colors.c8};
`;