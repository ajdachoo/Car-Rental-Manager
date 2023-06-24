import styled from "styled-components";

export const ViewWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.c2};
    border-radius: 15px;
    padding: 20px;
    margin: 15px;
    box-shadow: ${({ theme }) => theme.shadows.s1};
    max-width: 100%;
    overflow-y: auto;
`;