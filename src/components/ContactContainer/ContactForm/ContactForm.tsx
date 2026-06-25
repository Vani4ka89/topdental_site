import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IForm} from "../../../interfaces";
import {sendFormService} from "../../../services";
import {firstFormValidator} from "../../../validators";
import {ModalComponent} from "../../ModalComponent/ModalComponent";
import {Button, FormField} from "../../ui";
import {useContent} from '../../../content';
import './contact-form.css';

const normalizePhone = (value: string) => {
    const hasPlus = value.trim().startsWith('+');
    const digits = value.replace(/\D/g, '').slice(0, 12);

    if (hasPlus || digits.startsWith('380')) {
        return `+${digits}`;
    }

    return digits;
};

const ContactForm: FC = () => {
    const {content} = useContent();
    const formContent = content.forms.contact;
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<IForm>({
        defaultValues: {comment: '', name: '', phoneNumber: ''},
        mode: "onChange",
        resolver: joiResolver(firstFormValidator)
    });

    const phoneRegistration = register('phoneNumber', {
        onChange: (event) => {
            event.target.value = normalizePhone(event.target.value);
        }
    });

    const send: SubmitHandler<IForm> = async (fields: IForm) => {
        setErrorMessage('');

        try {
            await sendFormService.sendFirstForm(fields);
            reset({comment: '', name: '', phoneNumber: ''});
            setIsSuccessOpen(true);
        } catch {
            setErrorMessage(formContent.errorMessage);
        }
    };

    return (
        <>
            <form className="contact-form appointment-form" onSubmit={handleSubmit(send)} noValidate>
                <FormField
                    autoComplete="name"
                    disabled={isSubmitting}
                    error={errors.name?.message}
                    label={formContent.nameLabel}
                    placeholder={formContent.namePlaceholder}
                    registration={register('name')}
                    required
                    type="text"
                />
                <FormField
                    autoComplete="tel"
                    disabled={isSubmitting}
                    error={errors.phoneNumber?.message}
                    helperText={formContent.phoneHelper}
                    inputMode="tel"
                    label={formContent.phoneLabel}
                    placeholder={formContent.phonePlaceholder}
                    registration={phoneRegistration}
                    required
                    type="tel"
                />
                <FormField
                    as="textarea"
                    disabled={isSubmitting}
                    label={formContent.commentLabel}
                    placeholder={formContent.commentPlaceholder}
                    registration={register('comment')}
                    rows={5}
                />
                {errorMessage && <p className="form-alert form-alert--error" role="alert">{errorMessage}</p>}
                <Button className="appointment-form__submit" disabled={isSubmitting} type="submit">
                    {isSubmitting ? formContent.submittingLabel : formContent.submitLabel}
                </Button>
            </form>
            <ModalComponent
                isOpen={isSuccessOpen}
                message={formContent.successMessage}
                onClose={() => setIsSuccessOpen(false)}
                title={formContent.successTitle}
            />
        </>
    );
};

export {ContactForm};
