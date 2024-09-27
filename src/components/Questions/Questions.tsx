import {FC, SyntheticEvent, useState} from 'react';

import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '../../styles/questions.css';

const Questions: FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <section className="questions" style={{width: '100%'}}>
            <div className="main__container">
                <div className="block">
                    <h2>Залишилися запитання?</h2>
                    <p className={'description'}>Перегляньте відповіді на найпопулярніші питання.</p>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '100%', flexShrink: 0}}>
                                Що робити, коли втратив зуб?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{fontStyle: 'italic'}}>
                                Найкращий варіант замінити відсутній зуб - це імплантація. Імплант буде на місці кореня
                                зуба і
                                стане надійною точкою опори для подальшого протезування. Завдяки цьому варіанту ви
                                отримаєте
                                повну функціональність зубів та цілком природній зовнішній вигляд. Проте є менш затратні
                                варіанти, але це вирішує лікар-ортопед після огляду та консультації з пацієнтом.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '100%', flexShrink: 0}}>
                                Скільки часу заживає рана після видалення зуба?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{fontStyle: 'italic'}}>
                                У середньому загоєння триває 14-20 днів, але все залежить від індивідуальних
                                особливостей
                                пацієнта, його загального стану здоровʼя. Важливо правильно доглядати за ротовою
                                порожниною та
                                дотримуватися всіх рекомендацій лікаря, щоб не допустити розвитку ускладнень.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '100%', flexShrink: 0}}>
                                Скільки часу триває процедура гігієни порожнини рота? І як часто потрібно робити дану
                                процедуру?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{fontStyle: 'italic'}}>
                                Професійну гігієну порожнини рота рекомендовано проводити 2-3 рази на рік. Тривалість
                                процедури
                                визначається індивідуально, залежно від стану ротової порожнини. В середньому — 40
                                хвилин.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '100%', flexShrink: 0}}>
                                Чи обовʼязково видаляти 8-мі зуби?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{fontStyle: 'italic'}}>
                                Не обовʼязково, але рекомендовано якщо:
                                <br/>
                                ● вони створюють дискомфорт і біль під час прорізування.
                                <br/>
                                ● через важкодоступність 8-мі зуби недочищають, в результаті утворюється карієс.
                                <br/>
                                ● в більшості випадків вони займають неправильне положення - ростуть в бік щоки або
                                нахиляються
                                до 7-го зуба, як результат - не приймають ніякої участі в акті жування.
                                <br/>
                                ● в 90% людей 8-мі зуби не мають повноцінного місця в ротовій порожнині. Тому під час
                                прорізування вони тиснуть на сусідні зуби, чим створюють скупченість зубів у фронтальній
                                ділянці.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '100%', flexShrink: 0}}>
                                Чи можна ставити брекети в дорослому віці?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{fontStyle: 'italic'}}>
                                Так, сучасні методи лікування надають змогу починати ортодонтичне лікування і в 15, і в
                                30, і в
                                60 років.
                                Можливо, в більш зрілих пацієнтів це буде довший процес, але в цілому сучасні
                                брекет-системи
                                добре зарекомендували себе в роботі з пацієнтами різного віку.
                                Ніколи не пізно зайнятися здоровʼям і красою своєї посмішки.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '100%', flexShrink: 0}}>
                                Яка різниця між брекетами і елайнерами? Що краще?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{fontStyle: 'italic'}}>
                                Брекети:
                                <br/>
                                ● незнімні
                                <br/>
                                ● візит кожні 1 - 1,5 міс
                                <br/>
                                ● обмеження в їжі
                                <br/>
                                ● ретельніша гігієна
                                <br/>
                                ● довший час лікування
                                <br/>
                                ● лікування складних випадків
                                <br/><br/>
                                Елайнери:
                                <br/>
                                ● знімні, прозорі, майже не помітні
                                <br/>
                                ● активовуються за допомогою атачменів, які фіксуються на зубах
                                <br/>
                                ● візит раз на 3 - 4 міс
                                <br/>
                                ● прогнозоване лікування та результат
                                <br/>
                                ● немає обмежень в їжі
                                <br/>
                                ● переважно для лікування нескладних випадків
                                <br/>
                                <br/>
                                Який метод лікування буде ефективнішим саме для вашого випадку може визначити лише
                                ортодонт
                                після огляду та консультації.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export {Questions};
