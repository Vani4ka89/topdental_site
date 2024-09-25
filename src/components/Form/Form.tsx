import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IForm} from "../../interfaces/form.interface";

import '../../styles/contact.css';
import '../../styles/contact-form.css';

const Form: FC = () => {
    const {register, handleSubmit, reset} = useForm<IForm>({mode: "onSubmit"});

    const send: SubmitHandler<IForm> = (data: IForm) => {
        console.log(data);
        reset();
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit(send)}>
            <div className="form-group">
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Ваше ім'я"
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="tel"
                    id="phone"
                    {...register('phoneNumber')}
                    placeholder="Номер телефону"
                    required
                />
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

export {Form};
