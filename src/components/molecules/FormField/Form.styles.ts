import styled from "styled-components";
import { StyledButton } from "components/atoms/Button/Button";

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.c5};
    font-size: ${({ theme }) => theme.fontSize.xxl};
`;

export const FormButton = styled(StyledButton)`
    margin-top: 30px;
`;