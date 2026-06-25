import {FC, InputHTMLAttributes, TextareaHTMLAttributes} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

interface IBaseFormFieldProps {
    error?: string;
    helperText?: string;
    label: string;
    registration?: UseFormRegisterReturn;
}

type InputFieldProps = IBaseFormFieldProps & InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input';
};

type TextareaFieldProps = IBaseFormFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea';
};

type FormFieldProps = InputFieldProps | TextareaFieldProps;

const FormField: FC<FormFieldProps> = ({as = 'input', error, helperText, label, registration, id, ...props}) => {
    const fieldId = id || registration?.name || label;
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;
    const commonProps = {
        'aria-describedby': [error ? errorId : '', helperText ? helperId : ''].filter(Boolean).join(' ') || undefined,
        'aria-invalid': Boolean(error),
        id: fieldId,
        ...registration,
    };

    return (
        <div className={`form-field ${error ? 'form-field--error' : ''}`}>
            <label className="form-field__label" htmlFor={fieldId}>{label}</label>
            {as === 'textarea' ? (
                <textarea {...commonProps} {...props as TextareaHTMLAttributes<HTMLTextAreaElement>} />
            ) : (
                <input {...commonProps} {...props as InputHTMLAttributes<HTMLInputElement>} />
            )}
            {helperText && <p className="form-field__helper" id={helperId}>{helperText}</p>}
            {error && <p className="form-field__error" id={errorId}>{error}</p>}
        </div>
    );
};

export {FormField};
