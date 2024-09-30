import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IFormTwo} from "../../../interfaces";

import './recording-form.css';
import {sendFormService} from "../../../services";
import {joiResolver} from "@hookform/resolvers/joi";
import {secondFormValidator} from "../../../validators/second-form.validator";

const RecordingForm: FC = () => {
    const {register, handleSubmit, reset} = useForm<IFormTwo>({
        mode: "onSubmit",
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

    const send: SubmitHandler<IFormTwo> = async (data: IFormTwo) => {
        console.log(data);
        try {
            const res = await sendFormService.sendSecondForm(data);
            setDateValue(today);
            reset();
            console.log(res.data);
        } catch (e) {
            console.log('Server Error!!!');
        }
    };

    // const checkPhone = () => {
    //
    // }

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
            </div>

            <div className="form-group">
                <input
                    type="tel"
                    id="phone"
                    // onInput={checkPhone}
                    // value={register.phoneNumber}
                    {...register('phoneNumber')}
                    placeholder="Номер телефону*"
                    pattern="^(\+?38)?0\d{9}$"
                    inputMode="tel"
                    required
                />
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
        </form>
    );
};

export {RecordingForm};
