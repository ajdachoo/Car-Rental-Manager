import styled from "styled-components";

export const StyledTd = styled.td<{ $status?: 'succes' | 'warning' | 'inProgress' }>`
    padding: 10px;
    text-align: left;
    color: ${({ theme, $status }) => {
        if ($status === 'warning') return theme.colors.warning;
        if ($status === 'inProgress') return theme.colors.inProgress;
        if ($status === 'succes') return theme.colors.succes;
    }};
`;

export const StyledTr = styled.tr`
    border-bottom: solid 2px ${({ theme }) => theme.colors.c8};
`;