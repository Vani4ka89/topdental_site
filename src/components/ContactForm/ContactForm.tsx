import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IForm} from "../../interfaces";

import '../../styles/contact-form.css';
import {sendFormService} from "../../services";

const ContactForm: FC = () => {
    const {register, handleSubmit, reset} = useForm<IForm>({mode: "onSubmit"});

    const send: SubmitHandler<IForm> = async (data: IForm) => {
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
                    {...register('name')}
                    placeholder="Ваше ім'я*"
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="tel"
                    id="phone"
                    {...register('phoneNumber')}
                    placeholder="Номер телефону*"
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

export {ContactForm};
