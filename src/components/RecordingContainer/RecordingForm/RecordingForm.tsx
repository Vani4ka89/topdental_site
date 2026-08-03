import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IFormTwo} from "../../../interfaces";
import {sendFormService} from "../../../services";
import {secondFormValidator} from "../../../validators";
import {ModalComponent} from "../../ModalComponent/ModalComponent";
import {Button, FormField} from "../../ui";
import {useContent} from '../../../content';
import './recording-form.css';

const getToday = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${now.getFullYear()}-${month}-${day}`;
};

const normalizePhone = (value: string) => {
    const hasPlus = value.trim().startsWith('+');
    const digits = value.replace(/\D/g, '').slice(0, 12);

    if (hasPlus || digits.startsWith('380')) {
        return `+${digits}`;
    }

    return digits;
};

const RecordingForm: FC = () => {
    const {content} = useContent();
    const formContent = content.forms.recording;
    const today = getToday();
    const [dateValue, setDateValue] = useState<string>(today);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {register, handleSubmit, reset, setValue, formState: {errors, isSubmitting}} = useForm<IFormTwo>({
        defaultValues: {date: today, name: '', phoneNumber: ''},
        mode: "onChange",
        resolver: joiResolver(secondFormValidator)
    });

    const phoneRegistration = register("phoneNumber", {
        onChange: (event) => {
            event.target.value = normalizePhone(event.target.value);
        }
    });

    const dateRegistration = register('date', {
        onChange: (event) => {
            const value = event.target.value;
            const nextValue = value && value < today ? today : value;

            if (nextValue !== value) {
                setValue('date', nextValue, {shouldValidate: true});
            }

            setDateValue(nextValue);
        },
    });

    const send: SubmitHandler<IFormTwo> = async (fields: IFormTwo) => {
        setErrorMessage('');

        try {
            await sendFormService.sendSecondForm(fields);
            setDateValue(today);
            reset({date: today, name: '', phoneNumber: ''});
            setIsSuccessOpen(true);
        } catch {
            setErrorMessage(formContent.errorMessage);
        }
    };

    return (
        <>
            <form className="recording-form appointment-form" onSubmit={handleSubmit(send)} noValidate>
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
                    disabled={isSubmitting}
                    error={errors.date?.message}
                    label={formContent.dateLabel}
                    min={today}
                    registration={dateRegistration}
                    required
                    type="date"
                    value={dateValue}
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

export {RecordingForm};
