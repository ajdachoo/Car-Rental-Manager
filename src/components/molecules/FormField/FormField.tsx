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
    isRequired?: boolean;
};

interface FormFieldSelectProps {
    onChange: ChangeEventHandler;
    value: string;
    label: string;
    name: string;
    id: string;
    options: formSelectOptionProps[];
    isRequired?: boolean;
};

interface FormFieldDateProps extends FormFieldProps {
    minDate?: string;
};

export interface formSelectOptionProps {
    option: string;
    value: string | number;
};

export const FormField: React.FC<FormFieldProps> = ({ onChange, value, label, name, id, type = 'text', isRequired = false }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput required={isRequired} name={name} id={id} type={type} value={value} onChange={onChange} />
        </Wrapper>
    );
};

export const FormFieldSelect: React.FC<FormFieldSelectProps> = ({ onChange, value, label, name, id, options, isRequired = false }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledSelect required={isRequired} name={name} id={id} value={value} onChange={onChange}>
                {options.map((option) => <option key={option.option} value={option.value}>{option.option}</option>)}
            </StyledSelect>
        </Wrapper>
    );
};

export const FormFieldDate: React.FC<FormFieldDateProps> = ({ onChange, value, label, name, id, minDate, isRequired = false }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput required={isRequired} min={minDate} name={name} id={id} type="date" value={value} onChange={onChange} />
        </Wrapper>
    );
};

export const FormFieldTime: React.FC<FormFieldProps> = ({ onChange, value, label, name, id, isRequired = false }) => {
    return (
        <Wrapper>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput required={isRequired} name={name} id={id} type="time" value={value} onChange={onChange}></StyledInput>
        </Wrapper>
    );
};
