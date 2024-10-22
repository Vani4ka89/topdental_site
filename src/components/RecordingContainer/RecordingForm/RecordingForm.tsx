import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Link} from "react-router-dom";
import {AxiosError} from "axios";

import {IFormTwo} from "../../../interfaces";
import {sendFormService} from "../../../services";
import {secondFormValidator} from "../../../validators";

import './recording-form.css';

const RecordingForm: FC = () => {
    const [answer, setAnswer] = useState(null);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormTwo>({
        mode: "onChange",
        resolver: joiResolver(secondFormValidator)
    });
    const date = new Date();
    const year = date.getFullYear();

    let month: number | string = date.getMonth() + 1
    let day: number | string = date.getDate()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    const today = `${year}-${month}-${day}`
    const [dateValue, setDateValue] = useState<string>(today);

    const send: SubmitHandler<IFormTwo> = async (fields: IFormTwo) => {
        try {
            const {data} = await sendFormService.sendSecondForm(fields);
            setAnswer(data)
            setDateValue(today);
            reset();
        } catch (e) {
            throw new AxiosError('Server Error!!!');
        }
    };

    const hideAnswer = () => {
        setAnswer(null);
    };

    return (
        <form className="recording-form" onSubmit={handleSubmit(send)}>
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
                    {...register("phoneNumber",
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
                <input
                    type="date"
                    id="date"
                    {...register('date')}
                    value={dateValue}
                    min={today}
                    required
                    onChange={(item) => {
                        setDateValue(item.target.value);
                    }}
                />
            </div>
            <button className="submit-btn btn" type="submit">Отримати консультацію</button>
            {answer &&
                <div className="answer">
                    <p> ☑️️</p>
                    <p>Дякую!</p>
                    <p>Ми Вам перетелефонуємо.</p>
                    <Link to="" className="btn-dialog" onClick={hideAnswer}>OK</Link>
                </div>
            }
        </form>
    );
};

export {RecordingForm};
