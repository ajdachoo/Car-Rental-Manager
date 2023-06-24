import styled from "styled-components";

export const StyledTable = styled.table`
    font-size: ${({ theme }) => theme.fontSize.ml};
    border-collapse: collapse;
    
    tr {
        border-bottom: solid 2px ${({ theme }) => theme.colors.c8};
    }

    th {
        padding: 10px;
        text-align: left;
    }
`;