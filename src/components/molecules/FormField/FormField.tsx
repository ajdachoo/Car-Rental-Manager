import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

interface FormFieldProps {
    onChange: ChangeEventHandler;
    value: string;
    label: string;
    name: string;
    id: string;
    type?: string;
};

const Wrapper = styled.div`

`;

const StyledLabel = styled.label``;

const StyledInput = styled.input``;

const FormField: React.FC<FormFieldProps> = ({ onChange, value, label, name, id, type = 'text' }) => {
    return (
        <Wrapper>
            <label htmlFor={id}>{label}</label>
            <input name={name} id={id} type={type} value={value} onChange={onChange} />
        </Wrapper>
    );
};

export default FormField;