import styled, { css } from "styled-components";
import { StyledButton } from "components/atoms/Button/Button";

export const Title = styled.h1`
    color: ${({ theme }) => theme.colors.c5};
    font-size: ${({ theme }) => theme.fontSize.xxl};
`;

export const FormButton = styled(StyledButton)`
    margin-top: 30px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
`;

export const inputStyles = css`
    border: solid 2px ${({ theme }) => theme.colors.c8};
    border-radius: 5px;
    padding: 5px;
`;

export const StyledLabel = styled.label`
    color: ${({ theme }) => theme.colors.c5};
    font-size: ${({ theme }) => theme.fontSize.ml};
    font-weight: 700;
`;

export const StyledInput = styled.input`${inputStyles}`;

export const StyledSelect = styled.select`${inputStyles}`;