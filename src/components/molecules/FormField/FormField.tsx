import React, { ChangeEventHandler } from "react";
import { Wrapper } from "./Form.styles";
import { StyledLabel, StyledInput, StyledSelect } from "./Form.styles";

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
                {options.map((option) => <option key={option.option} value={option.value}>{option.option}</option>)}
            </StyledSelect>
        </Wrapper>
    );
};

export const FormFieldDate: React.FC<FormFieldProps> = ({ onChange, value, label, name, id }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput name={name} id={id} type="date" value={value} onChange={onChange} />
        </Wrapper>
    );
};
