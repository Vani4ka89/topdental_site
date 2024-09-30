import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IFormTwo} from "../../../interfaces";

import './recording-form.css';
import {sendFormService} from "../../../services";
import {joiResolver} from "@hookform/resolvers/joi";
import {secondFormValidator} from "../../../validators";

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
                    placeholder="Номер телефону*"
                    required
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+380\d{9}$/, // Номер має починатися з +380 і мати 9 цифр
                            message: "Invalid phone number. Format should be +380XXXXXXXXX",
                        },
                        validate: {
                            noLetters: (value) =>
                                /^[+0-9]+$/.test(value) || "Phone number must contain only numbers and '+'", // Забороняємо літери
                            isNumericOnly: (value) =>
                                /^[\d]+$/.test(value.slice(4)) || "Phone number must contain only digits after +380", // Після +380 тільки цифри
                        },
                        onChange: (e) => {
                            // Очищення введених символів, які не є цифрами або +
                            e.target.value = e.target.value.replace(/[^+\d]/g, "");
                        }
                    })}
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
