import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.c2};
    border-radius: 15px;
    padding: 20px;
    margin: 15px;
    box-shadow: ${({ theme }) => theme.shadows.s1};
    max-width: 100%;
    overflow-y: auto;
    font-size: ${({ theme }) => theme.fontSize.ml};

    table {
        border-collapse: collapse;
    }

    tr {
        border-bottom: solid 2px ${({ theme }) => theme.colors.c8};
    }

    th {
        padding: 10px;
        text-align: left;
    }
`;