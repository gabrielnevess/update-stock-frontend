import React from "react";
import {
     TextField, 
     TextFieldProps
} from "@material-ui/core";
import { FieldProps } from "formik";

interface InputProps {
    field: FieldProps;
    props: TextFieldProps;
}

const Input: React.FC<InputProps> = ({ field, ...props }) => {
    return <TextField {...field} {...props} />;
};

export default Input;