import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Link} from "react-router-dom";
import {AxiosError} from "axios";

import {IForm} from "../../../interfaces";
import {sendFormService} from "../../../services";
import {firstFormValidator} from "../../../validators";

import './contact-form.css';

const ContactForm: FC = () => {
    const [answer, setAnswer] = useState(null);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IForm>({
        mode: "onChange",
        resolver: joiResolver(firstFormValidator)
    });

    const hideAnswer = () => {
        setAnswer(null);
    };

    const send: SubmitHandler<IForm> = async (fields: IForm) => {
        try {
            const {data} = await sendFormService.sendFirstForm(fields);
            setAnswer(data);
            reset();
        } catch (e) {
            throw new AxiosError('Server Error!!!');
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit(send)}>
            <div className="form-group">
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Ваше ім'я*"
                    required
                />
                {
                    errors.name?.message &&
                    <div className="error">
                        {errors.name?.message}
                    </div>
                }
            </div>

            <div className="form-group">
                <input
                    type="tel"
                    placeholder="Номер телефону*"
                    required
                    {...register('phoneNumber',
                        {
                            onChange: (e) => {
                                e.target.value = e.target.value.replace(/[^+\d]/g, "");
                            }
                        }
                    )}
                />
                {
                    errors.phoneNumber?.message &&
                    <div className="error">
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
            {answer &&
                <div className="answer">
                    <p> ☑️️</p>
                    <p className="thanks">Дякую!</p>
                    <p>Ми Вам перетелефонуємо.</p>
                    <Link to="" className="btn" onClick={hideAnswer}>OK</Link>
                </div>
            }
        </form>
    );
};

export {ContactForm};
