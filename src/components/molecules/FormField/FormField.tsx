import React, { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";

interface FormFieldProps {
    onChange: ChangeEventHandler;
    value: string;
    label: string;
    name: string;
    id: string;
    type?: string;
};

interface FormFieldSelectProps {
    onChange: ChangeEventHandler;
    value: string;
    label: string;
    name: string;
    id: string;
    options: formSelectOptionProps[];
};

export interface formSelectOptionProps {
    option: string;
    value: string | number;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
`;

const inputStyles = css`
    border: solid 2px ${({ theme }) => theme.colors.c8};
    border-radius: 5px;
    padding: 5px;
`;

const StyledLabel = styled.label`
    color: ${({ theme }) => theme.colors.c5};
    font-size: ${({ theme }) => theme.fontSize.ml};
    font-weight: 700;
`;

const StyledInput = styled.input`${inputStyles}`;

const StyledSelect = styled.select`${inputStyles}`;

export const FormField: React.FC<FormFieldProps> = ({ onChange, value, label, name, id, type = 'text' }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput name={name} id={id} type={type} value={value} onChange={onChange} />
        </Wrapper>
    );
};

export const FormFieldSelect: React.FC<FormFieldSelectProps> = ({ onChange, value, label, name, id, options }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledSelect name={name} id={id} value={value} onChange={onChange}>
                {options.map((option) => <option value={option.value}>{option.option}</option>)}
            </StyledSelect>
        </Wrapper>
    );
};
