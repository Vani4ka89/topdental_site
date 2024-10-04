import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IForm} from "../../../interfaces";

import './contact-form.css';
import {sendFormService} from "../../../services";
import {joiResolver} from "@hookform/resolvers/joi";
import {firstFormValidator} from "../../../validators";

const ContactForm: FC = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IForm>({
        mode: "onChange",
        resolver: joiResolver(firstFormValidator)
    });

    const send: SubmitHandler<IForm> = async (data: IForm) => {
        console.log(data);
        try {
            const res = await sendFormService.sendFirstForm(data);
            reset();
            console.log(res.data);
        } catch (e) {
            console.log('Server Error!!!');
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit(send)}>
            <div className="form-group">
                <input
                    type="text"
                    id="name"
                    {...register('name', {
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я]{1,20}$/,
                            message: 'Невірно введено ім\'я'
                        },
                        validate: {
                            lettersOnly: value => /^[a-zA-Zа-яА-Я]{1,20}$/.test(value) || 'Невірно введено ім\'я'
                        }
                    })}
                    placeholder="Ваше ім'я*"
                    required
                />
                {
                    errors.name?.message &&
                    <div
                        style={{fontSize: '12px', color: 'red'}}
                    >
                        {errors.name?.message}
                    </div>
                }
            </div>

            <div className="form-group">
                <input
                    type="tel"
                    placeholder="Номер телефону*"
                    required
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+\d{9}$/,
                            message: "Invalid phone number. Format should be +380XXXXXXXXX",
                        },
                        validate: {
                            noLetters: (value) =>
                                /^[+0-9]+$/.test(value) || "Phone number must contain only numbers and '+'",
                            isNumericOnly: (value) =>
                                /^[\d]+$/.test(value.slice(4)) || "Phone number must contain only digits after +380",
                        },
                        onChange: (e) => {
                            e.target.value = e.target.value.replace(/[^+\d]/g, "");
                        }
                    })}
                />
                {
                    errors.phoneNumber?.message &&
                    <div
                        style={{fontSize: '12px', color: 'red'}}
                    >
                        {errors.phoneNumber?.message}
                    </div>
                }
            </div>

            <div className="form-group">
                <textarea
                    id="comment"
                    {...register('comment')}
                    placeholder="Коментар"
                    rows={6}
                />
            </div>
            <button className="submit-btn btn" type="submit">Отримати консультацію</button>
        </form>
    );
};

export {ContactForm};
