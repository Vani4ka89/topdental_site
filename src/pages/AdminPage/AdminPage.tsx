import {ChangeEvent, FC, useEffect, useMemo, useState} from 'react';

import {Container, Seo} from '../../components';
import {defaultContent, mergeDeep, SiteContent, useContent} from '../../content';
import './admin-page.css';

type ContentPath = Array<number | string>;
type AdminTab = 'base' | 'home' | 'team' | 'pages' | 'json';

const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'topdental-admin';

const tabs: Array<{id: AdminTab; label: string}> = [
    {id: 'base', label: 'Основне'},
    {id: 'home', label: 'Головна'},
    {id: 'team', label: 'Послуги і лікарі'},
    {id: 'pages', label: 'Сторінки і SEO'},
    {id: 'json', label: 'JSON'},
];

const cloneValue = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const getValue = (source: unknown, path: ContentPath): unknown => (
    path.reduce<unknown>((acc, key) => {
        if (acc === null || acc === undefined) {
            return undefined;
        }

        return (acc as Record<string, unknown>)[key];
    }, source)
);

const setValue = <T,>(source: T, path: ContentPath, value: unknown): T => {
    const copy = cloneValue(source);
    let target = copy as Record<string, unknown>;

    path.slice(0, -1).forEach((key, index) => {
        const nextKey = path[index + 1];

        if (target[key] === undefined || target[key] === null || typeof target[key] !== 'object') {
            target[key] = typeof nextKey === 'number' ? [] : {};
        }

        target = target[key] as Record<string, unknown>;
    });

    target[path[path.length - 1]] = value;

    return copy;
};

const appendValue = <T,>(source: T, path: ContentPath, value: unknown): T => {
    const list = getValue(source, path);

    return setValue(source, path, [...(Array.isArray(list) ? list : []), value]);
};

const removeValue = <T,>(source: T, path: ContentPath, index: number): T => {
    const list = getValue(source, path);

    if (!Array.isArray(list)) {
        return source;
    }

    return setValue(source, path, list.filter((_item, itemIndex) => itemIndex !== index));
};

const readFileAsDataUrl = (file: File) => (
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    })
);

const newLocation = {
    name: 'Нова локація',
    address: '',
    phone: '',
    phoneDisplay: '',
    mapTitle: '',
    mapSrc: '',
};

const newReview = {
    name: 'Новий відгук',
    image: {src: '', alt: ''},
    comment: '',
    date: '',
    rating: 5,
    source: 'Google',
};

const newFaq = {
    id: `faq-${Date.now()}`,
    question: 'Нове запитання',
    answer: '',
};

const newService = {
    title: 'Нова послуга',
    description: '',
    details: [''],
    iconSvg: '',
    result: '',
};

const newDoctor = {
    name: 'Новий лікар',
    role: '',
    image: {src: '', alt: ''},
    description: '',
    badges: [''],
    credentials: [''],
};

const newImage = {
    src: '',
    alt: '',
};

const ADMIN_UNLOCK_KEY = 'topdental.admin.unlocked';
const ADMIN_TOKEN_KEY = 'topdental.admin.token';

const AdminPage: FC = () => {
    const {content, isRemoteContentEnabled, resetContent, saveContent, verifyAdminPassword} = useContent();
    const initialAdminToken = window.sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
    const [draft, setDraft] = useState<SiteContent>(content);
    const [activeTab, setActiveTab] = useState<AdminTab>('base');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [adminToken, setAdminToken] = useState(initialAdminToken);
    const [isUnlocked, setIsUnlocked] = useState(() => (
        window.sessionStorage.getItem(ADMIN_UNLOCK_KEY) === 'true' && (!isRemoteContentEnabled || Boolean(initialAdminToken))
    ));
    const [jsonValue, setJsonValue] = useState('');
    const [isJsonDirty, setIsJsonDirty] = useState(false);

    useEffect(() => {
        setDraft(content);
        setIsJsonDirty(false);
    }, [content]);

    useEffect(() => {
        if (!isJsonDirty) {
            setJsonValue(JSON.stringify(draft, null, 2));
        }
    }, [draft, isJsonDirty]);

    const currentYear = useMemo(() => new Date().getFullYear(), []);

    const fieldValue = (path: ContentPath) => {
        const value = getValue(draft, path);

        return value === undefined || value === null ? '' : String(value);
    };

    const updateField = (path: ContentPath, value: unknown) => {
        setDraft(previous => setValue(previous, path, value));
        setStatus('');
    };

    const addItem = (path: ContentPath, value: unknown) => {
        setDraft(previous => appendValue(previous, path, cloneValue(value)));
        setStatus('');
    };

    const removeItem = (path: ContentPath, index: number) => {
        setDraft(previous => removeValue(previous, path, index));
        setStatus('');
    };

    const handleSave = async () => {
        if (isRemoteContentEnabled && !adminToken) {
            setStatus('Потрібно повторно увійти в адмінку для збереження на сервері.');
            setIsUnlocked(false);
            return;
        }

        try {
            await saveContent(draft, adminToken);
            setStatus(isRemoteContentEnabled
                ? 'Збережено на сервері. Зміни будуть доступні всім браузерам.'
                : 'Збережено. Зміни вже застосовані на сайті у цьому браузері.');
        } catch {
            setStatus('Не вдалося зберегти контент. Перевірте пароль, API або зʼєднання.');
        }
    };

    const handleReset = async () => {
        if (isRemoteContentEnabled && !adminToken) {
            setStatus('Потрібно повторно увійти в адмінку для скидання контенту на сервері.');
            setIsUnlocked(false);
            return;
        }

        if (!window.confirm(isRemoteContentEnabled ? 'Скинути контент на сервері до дефолтного стану?' : 'Скинути всі локальні зміни контенту?')) {
            return;
        }

        try {
            await resetContent(adminToken);
            setDraft(defaultContent);
            setStatus('Контент скинуто до дефолтного стану.');
        } catch {
            setStatus('Не вдалося скинути контент. Перевірте пароль, API або зʼєднання.');
        }
    };

    const handleUnlock = async () => {
        const isPasswordValid = isRemoteContentEnabled
            ? await verifyAdminPassword(password)
            : password === adminPassword;

        if (isPasswordValid) {
            window.sessionStorage.setItem(ADMIN_UNLOCK_KEY, 'true');
            window.sessionStorage.setItem(ADMIN_TOKEN_KEY, password);
            setAdminToken(password);
            setIsUnlocked(true);
            setPassword('');
            return;
        }

        setStatus('Невірний пароль.');
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(draft, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'site-content.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            const text = await file.text();
            const parsed = JSON.parse(text) as SiteContent;
            setDraft(mergeDeep(defaultContent, parsed));
            setStatus('JSON імпортовано. Натисніть "Зберегти зміни", щоб застосувати.');
        } catch {
            setStatus('Не вдалося імпортувати JSON. Перевірте формат файлу.');
        } finally {
            event.target.value = '';
        }
    };

    const applyJson = () => {
        try {
            const parsed = JSON.parse(jsonValue) as SiteContent;
            setDraft(mergeDeep(defaultContent, parsed));
            setIsJsonDirty(false);
            setStatus('JSON застосовано до чернетки.');
        } catch {
            setStatus('JSON має помилку синтаксису.');
        }
    };

    const Field = ({
        label,
        path,
        rows = 3,
        type = 'text',
    }: {
        label: string;
        path: ContentPath;
        rows?: number;
        type?: 'email' | 'number' | 'tel' | 'text' | 'url' | 'textarea';
    }) => {
        const value = fieldValue(path);

        if (type === 'textarea') {
            return (
                <label className="admin-field">
                    <span>{label}</span>
                    <textarea rows={rows} value={value} onChange={(event) => updateField(path, event.target.value)}/>
                </label>
            );
        }

        return (
            <label className="admin-field">
                <span>{label}</span>
                <input
                    type={type}
                    value={value}
                    onChange={(event) => updateField(path, type === 'number' ? Number(event.target.value) : event.target.value)}
                />
            </label>
        );
    };

    const ImageEditor = ({altPath, srcPath, title}: {altPath: ContentPath; srcPath: ContentPath; title: string}) => {
        const preview = fieldValue(srcPath);

        const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            const dataUrl = await readFileAsDataUrl(file);
            updateField(srcPath, dataUrl);
            event.target.value = '';
        };

        return (
            <div className="admin-image-editor">
                <div className="admin-image-editor__preview">
                    {preview ? <img src={preview} alt="Попередній перегляд"/> : <span>Немає зображення</span>}
                </div>
                <div className="admin-image-editor__fields">
                    <h4>{title}</h4>
                    <Field label="URL / Data URL зображення" path={srcPath} type="textarea" rows={2}/>
                    <Field label="Alt-текст" path={altPath}/>
                    <label className="admin-upload">
                        <span>Завантажити файл</span>
                        <input accept="image/*" type="file" onChange={handleUpload}/>
                    </label>
                </div>
            </div>
        );
    };

    const StringList = ({path, title}: {path: ContentPath; title: string}) => {
        const items = getValue(draft, path);
        const list = Array.isArray(items) ? items as string[] : [];

        return (
            <div className="admin-list">
                <div className="admin-list__head">
                    <h4>{title}</h4>
                    <button type="button" onClick={() => addItem(path, '')}>Додати</button>
                </div>
                {list.map((item, index) => (
                    <div className="admin-inline-row" key={`${title}-${index}`}>
                        <input value={item} onChange={(event) => updateField([...path, index], event.target.value)}/>
                        <button type="button" onClick={() => removeItem(path, index)}>Видалити</button>
                    </div>
                ))}
            </div>
        );
    };

    const NavigationEditor = () => {
        const items = draft.navigation.main;

        return (
            <div className="admin-card">
                <div className="admin-list__head">
                    <h3>Навігація</h3>
                    <button type="button" onClick={() => addItem(['navigation', 'main'], {label: 'Новий пункт', to: '/'})}>Додати</button>
                </div>
                {items.map((_item, index) => (
                    <div className="admin-repeater" key={`nav-${index}`}>
                        <Field label="Назва" path={['navigation', 'main', index, 'label']}/>
                        <Field label="Посилання" path={['navigation', 'main', index, 'to']}/>
                        <button className="admin-danger" type="button" onClick={() => removeItem(['navigation', 'main'], index)}>Видалити пункт</button>
                    </div>
                ))}
            </div>
        );
    };

    const LocationsEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>Локації</h3>
                <button type="button" onClick={() => addItem(['clinic', 'locations'], newLocation)}>Додати</button>
            </div>
            {draft.clinic.locations.map((_location, index) => (
                <div className="admin-repeater" key={`location-${index}`}>
                    <Field label="Назва" path={['clinic', 'locations', index, 'name']}/>
                    <Field label="Адреса" path={['clinic', 'locations', index, 'address']} type="textarea"/>
                    <Field label="Телефон для посилання tel:" path={['clinic', 'locations', index, 'phone']} type="tel"/>
                    <Field label="Телефон на сайті" path={['clinic', 'locations', index, 'phoneDisplay']}/>
                    <Field label="Заголовок карти" path={['clinic', 'locations', index, 'mapTitle']}/>
                    <Field label="Google Maps embed URL" path={['clinic', 'locations', index, 'mapSrc']} type="textarea" rows={3}/>
                    <button className="admin-danger" type="button" onClick={() => removeItem(['clinic', 'locations'], index)}>Видалити локацію</button>
                </div>
            ))}
        </div>
    );

    const TrustList = ({path, title}: {path: ContentPath; title: string}) => {
        const list = getValue(draft, path);
        const items = Array.isArray(list) ? list : [];

        return (
            <div className="admin-card">
                <div className="admin-list__head">
                    <h3>{title}</h3>
                    <button type="button" onClick={() => addItem(path, {value: '', label: ''})}>Додати</button>
                </div>
                {items.map((_item, index) => (
                    <div className="admin-repeater admin-repeater--compact" key={`${title}-${index}`}>
                        <Field label="Значення" path={[...path, index, 'value']}/>
                        <Field label="Підпис" path={[...path, index, 'label']}/>
                        <button className="admin-danger" type="button" onClick={() => removeItem(path, index)}>Видалити</button>
                    </div>
                ))}
            </div>
        );
    };

    const HighlightsEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>Переваги на головній</h3>
                <button type="button" onClick={() => addItem(['home', 'about', 'highlights'], {title: '', text: ''})}>Додати</button>
            </div>
            {draft.home.about.highlights.map((_item, index) => (
                <div className="admin-repeater admin-repeater--compact" key={`highlight-${index}`}>
                    <Field label="Заголовок" path={['home', 'about', 'highlights', index, 'title']}/>
                    <Field label="Текст" path={['home', 'about', 'highlights', index, 'text']} type="textarea"/>
                    <button className="admin-danger" type="button" onClick={() => removeItem(['home', 'about', 'highlights'], index)}>Видалити</button>
                </div>
            ))}
        </div>
    );

    const GalleryEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>Галерея клініки</h3>
                <button type="button" onClick={() => addItem(['home', 'slider', 'images'], newImage)}>Додати фото</button>
            </div>
            {draft.home.slider.images.map((_image, index) => (
                <div className="admin-repeater" key={`gallery-${index}`}>
                    <ImageEditor
                        title={`Фото ${index + 1}`}
                        srcPath={['home', 'slider', 'images', index, 'src']}
                        altPath={['home', 'slider', 'images', index, 'alt']}
                    />
                    <button className="admin-danger" type="button" onClick={() => removeItem(['home', 'slider', 'images'], index)}>Видалити фото</button>
                </div>
            ))}
        </div>
    );

    const ReviewsEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>Відгуки</h3>
                <button type="button" onClick={() => addItem(['home', 'reviews', 'items'], newReview)}>Додати</button>
            </div>
            {draft.home.reviews.items.map((_review, index) => (
                <div className="admin-repeater" key={`review-${index}`}>
                    <Field label="Імʼя" path={['home', 'reviews', 'items', index, 'name']}/>
                    <Field label="Джерело" path={['home', 'reviews', 'items', index, 'source']}/>
                    <Field label="Дата" path={['home', 'reviews', 'items', index, 'date']}/>
                    <Field label="Оцінка" path={['home', 'reviews', 'items', index, 'rating']} type="number"/>
                    <Field label="Текст відгуку" path={['home', 'reviews', 'items', index, 'comment']} type="textarea" rows={4}/>
                    <ImageEditor
                        title="Фото пацієнта"
                        srcPath={['home', 'reviews', 'items', index, 'image', 'src']}
                        altPath={['home', 'reviews', 'items', index, 'image', 'alt']}
                    />
                    <button className="admin-danger" type="button" onClick={() => removeItem(['home', 'reviews', 'items'], index)}>Видалити відгук</button>
                </div>
            ))}
        </div>
    );

    const FaqEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>FAQ</h3>
                <button type="button" onClick={() => addItem(['home', 'questions', 'items'], {...newFaq, id: `faq-${Date.now()}`})}>Додати</button>
            </div>
            {draft.home.questions.items.map((_faq, index) => (
                <div className="admin-repeater" key={`faq-${index}`}>
                    <Field label="ID" path={['home', 'questions', 'items', index, 'id']}/>
                    <Field label="Питання" path={['home', 'questions', 'items', index, 'question']} type="textarea" rows={2}/>
                    <Field label="Відповідь" path={['home', 'questions', 'items', index, 'answer']} type="textarea" rows={4}/>
                    <button className="admin-danger" type="button" onClick={() => removeItem(['home', 'questions', 'items'], index)}>Видалити питання</button>
                </div>
            ))}
        </div>
    );

    const ServicesEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>Послуги</h3>
                <button type="button" onClick={() => addItem(['services', 'items'], newService)}>Додати</button>
            </div>
            {draft.services.items.map((_service, index) => (
                <div className="admin-repeater" key={`service-${index}`}>
                    <Field label="Назва" path={['services', 'items', index, 'title']}/>
                    <Field label="Опис" path={['services', 'items', index, 'description']} type="textarea"/>
                    <Field label="Результат / деталі" path={['services', 'items', index, 'result']} type="textarea" rows={4}/>
                    <Field label="SVG-код іконки" path={['services', 'items', index, 'iconSvg']} type="textarea" rows={6}/>
                    <StringList title="Чипи / пункти" path={['services', 'items', index, 'details']}/>
                    <button className="admin-danger" type="button" onClick={() => removeItem(['services', 'items'], index)}>Видалити послугу</button>
                </div>
            ))}
        </div>
    );

    const DoctorsEditor = () => (
        <div className="admin-card">
            <div className="admin-list__head">
                <h3>Лікарі</h3>
                <button type="button" onClick={() => addItem(['doctors', 'items'], newDoctor)}>Додати</button>
            </div>
            {draft.doctors.items.map((_doctor, index) => (
                <div className="admin-repeater" key={`doctor-${index}`}>
                    <Field label="Імʼя" path={['doctors', 'items', index, 'name']}/>
                    <Field label="Посада" path={['doctors', 'items', index, 'role']}/>
                    <Field label="Опис" path={['doctors', 'items', index, 'description']} type="textarea" rows={4}/>
                    <ImageEditor
                        title="Фото лікаря"
                        srcPath={['doctors', 'items', index, 'image', 'src']}
                        altPath={['doctors', 'items', index, 'image', 'alt']}
                    />
                    <StringList title="Бейджі" path={['doctors', 'items', index, 'badges']}/>
                    <StringList title="Пункти досвіду" path={['doctors', 'items', index, 'credentials']}/>
                    <button className="admin-danger" type="button" onClick={() => removeItem(['doctors', 'items'], index)}>Видалити лікаря</button>
                </div>
            ))}
        </div>
    );

    if (!isUnlocked) {
        return (
            <main className="main admin-page">
                <Seo title="Адмінка | TopDental" description="Адмін-панель TopDental"/>
                <Container className="admin-shell" size="narrow">
                    <section className="admin-login">
                        <p className="admin-kicker">TopDental CMS</p>
                        <h1>Вхід в адмінку</h1>
                        <p>
                            {isRemoteContentEnabled
                                ? 'Введіть пароль content API, щоб редагувати спільний контент сайту.'
                                : 'Введіть пароль адміністратора, щоб редагувати контент сайту.'}
                        </p>
                        <label className="admin-field">
                            <span>Пароль</span>
                            <input
                                autoComplete="current-password"
                                type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    void handleUnlock();
                                }
                            }}
                        />
                        </label>
                        {status && <p className="admin-status admin-status--error">{status}</p>}
                        <button className="admin-primary" type="button" onClick={() => void handleUnlock()}>Увійти</button>
                    </section>
                </Container>
            </main>
        );
    }

    return (
        <main className="main admin-page">
            <Seo title="Адмінка | TopDental" description="Адмін-панель TopDental"/>
            <Container className="admin-shell" size="wide">
                <section className="admin-hero">
                    <div>
                        <p className="admin-kicker">TopDental CMS</p>
                        <h1>Керування контентом сайту</h1>
                        <p>
                            Редагуйте тексти, посилання, контакти, списки та зображення. {isRemoteContentEnabled
                                ? 'Зміни зберігаються через content API і доступні всім браузерам.'
                                : 'Зміни зберігаються локально у браузері; для глобального оновлення підключіть content API або експортуйте site-content.json.'}
                        </p>
                    </div>
                    <div className="admin-actions">
                        <button type="button" onClick={handleExport}>Експорт JSON</button>
                        <label className="admin-import">
                            Імпорт JSON
                            <input accept="application/json" type="file" onChange={handleImport}/>
                        </label>
                        <button className="admin-danger" type="button" onClick={() => void handleReset()}>Скинути</button>
                        <button className="admin-primary" type="button" onClick={() => void handleSave()}>Зберегти зміни</button>
                    </div>
                </section>

                {status && <p className="admin-status">{status}</p>}

                <div className="admin-tabs" role="tablist" aria-label="Розділи адмінки">
                    {tabs.map(tab => (
                        <button
                            aria-selected={activeTab === tab.id}
                            className={activeTab === tab.id ? 'is-active' : ''}
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            role="tab"
                            type="button"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'base' && (
                    <div className="admin-grid">
                        <div className="admin-card">
                            <h3>Клініка</h3>
                            <Field label="Назва" path={['clinic', 'name']}/>
                            <Field label="Рік заснування" path={['clinic', 'founded']}/>
                            <Field label="Email" path={['clinic', 'email']} type="email"/>
                            <Field label="Телефон для tel:" path={['clinic', 'phone']} type="tel"/>
                            <Field label="Телефон на сайті" path={['clinic', 'phoneDisplay']}/>
                            <Field label="Консультація" path={['clinic', 'consultation']}/>
                            <Field label="Рядок міст" path={['clinic', 'cityLine']}/>
                        </div>
                        <div className="admin-card">
                            <h3>Графік і соцмережі</h3>
                            <Field label="Короткий графік" path={['clinic', 'hours', 'short']}/>
                            <Field label="Будні" path={['clinic', 'hours', 'weekdays']}/>
                            <Field label="Субота" path={['clinic', 'hours', 'saturday']}/>
                            <Field label="Неділя" path={['clinic', 'hours', 'sunday']}/>
                            <Field label="Facebook" path={['clinic', 'socials', 'facebook']} type="url"/>
                            <Field label="Instagram" path={['clinic', 'socials', 'instagram']} type="url"/>
                            <Field label="Telegram" path={['clinic', 'socials', 'telegram']} type="url"/>
                        </div>
                        <div className="admin-card">
                            <h3>Шапка сайту</h3>
                            <Field label="Brand prefix" path={['navigation', 'brandPrefix']}/>
                            <Field label="Brand suffix" path={['navigation', 'brandSuffix']}/>
                            <Field label="Підпис бренду" path={['navigation', 'brandTagline']}/>
                            <Field label="CTA у шапці" path={['navigation', 'ctaLabel']}/>
                            <Field label="CTA у мобільному меню" path={['navigation', 'mobileCtaLabel']}/>
                            <ImageEditor title="Логотип" srcPath={['assets', 'logo', 'src']} altPath={['assets', 'logo', 'alt']}/>
                        </div>
                        <div className="admin-card">
                            <h3>Футер</h3>
                            <Field label="Eyebrow" path={['footer', 'eyebrow']}/>
                            <Field label="Заголовок" path={['footer', 'title']} type="textarea"/>
                            <Field label="Опис" path={['footer', 'description']} type="textarea"/>
                            <Field label="Кнопка" path={['footer', 'ctaLabel']}/>
                            <Field label="Заголовок навігації" path={['footer', 'navigationTitle']}/>
                            <Field label="Заголовок контактів" path={['footer', 'contactsTitle']}/>
                            <Field label="Заголовок графіку" path={['footer', 'hoursTitle']}/>
                            <Field label={`Копірайт після © ${currentYear}`} path={['footer', 'copyright']}/>
                        </div>
                        <NavigationEditor/>
                        <LocationsEditor/>
                    </div>
                )}

                {activeTab === 'home' && (
                    <div className="admin-grid">
                        <div className="admin-card">
                            <h3>Hero</h3>
                            <Field label="Eyebrow" path={['home', 'hero', 'eyebrow']}/>
                            <Field label="Заголовок" path={['home', 'hero', 'title']} type="textarea"/>
                            <Field label="Опис" path={['home', 'hero', 'description']} type="textarea"/>
                            <Field label="Головна кнопка" path={['home', 'hero', 'primaryCtaLabel']}/>
                            <Field label="Друга кнопка" path={['home', 'hero', 'secondaryCtaLabel']}/>
                            <Field label="Локація в швидкій інформації" path={['home', 'hero', 'quickLocation']}/>
                            <ImageEditor title="Hero-зображення" srcPath={['home', 'hero', 'image', 'src']} altPath={['home', 'hero', 'image', 'alt']}/>
                        </div>
                        <TrustList title="Цифри в hero" path={['home', 'hero', 'trustItems']}/>
                        <div className="admin-card">
                            <h3>Про клініку на головній</h3>
                            <Field label="Eyebrow" path={['home', 'about', 'eyebrow']}/>
                            <Field label="Заголовок" path={['home', 'about', 'title']} type="textarea"/>
                            <Field label="Опис" path={['home', 'about', 'description']} type="textarea"/>
                            <Field label="Кнопка" path={['home', 'about', 'buttonLabel']}/>
                            <ImageEditor title="Зображення блоку" srcPath={['home', 'about', 'image', 'src']} altPath={['home', 'about', 'image', 'alt']}/>
                        </div>
                        <HighlightsEditor/>
                        <div className="admin-card">
                            <h3>Консультаційний блок</h3>
                            <Field label="Eyebrow" path={['home', 'cover', 'eyebrow']}/>
                            <Field label="Заголовок" path={['home', 'cover', 'title']} type="textarea"/>
                            <Field label="Опис" path={['home', 'cover', 'description']} type="textarea"/>
                            <Field label="Кнопка" path={['home', 'cover', 'buttonLabel']}/>
                            <ImageEditor title="Фото" srcPath={['home', 'cover', 'image', 'src']} altPath={['home', 'cover', 'image', 'alt']}/>
                        </div>
                        <div className="admin-card">
                            <h3>Галерея: заголовок</h3>
                            <Field label="Eyebrow" path={['home', 'slider', 'eyebrow']}/>
                            <Field label="Заголовок" path={['home', 'slider', 'title']} type="textarea"/>
                            <Field label="Опис" path={['home', 'slider', 'description']} type="textarea"/>
                        </div>
                        <GalleryEditor/>
                        <div className="admin-card">
                            <h3>Відгуки: заголовок</h3>
                            <Field label="Eyebrow" path={['home', 'reviews', 'eyebrow']}/>
                            <Field label="Заголовок" path={['home', 'reviews', 'title']} type="textarea"/>
                            <Field label="Опис" path={['home', 'reviews', 'description']} type="textarea"/>
                        </div>
                        <ReviewsEditor/>
                        <div className="admin-card">
                            <h3>Запис і контакти</h3>
                            <Field label="Запис: eyebrow" path={['home', 'recording', 'eyebrow']}/>
                            <Field label="Запис: заголовок" path={['home', 'recording', 'title']} type="textarea"/>
                            <Field label="Запис: опис" path={['home', 'recording', 'description']} type="textarea"/>
                            <Field label="Контакти: eyebrow" path={['home', 'contact', 'eyebrow']}/>
                            <Field label="Контакти: заголовок" path={['home', 'contact', 'title']} type="textarea"/>
                            <Field label="Контакти: опис" path={['home', 'contact', 'description']} type="textarea"/>
                            <Field label="Лейбл адреси" path={['home', 'contact', 'addressLabel']}/>
                            <Field label="Лейбл графіку" path={['home', 'contact', 'hoursLabel']}/>
                            <Field label="Лейбл телефону" path={['home', 'contact', 'phoneLabel']}/>
                            <Field label="Лейбл email" path={['home', 'contact', 'emailLabel']}/>
                        </div>
                        <div className="admin-card">
                            <h3>FAQ: заголовок</h3>
                            <Field label="Eyebrow" path={['home', 'questions', 'eyebrow']}/>
                            <Field label="Заголовок" path={['home', 'questions', 'title']} type="textarea"/>
                            <Field label="Опис" path={['home', 'questions', 'description']} type="textarea"/>
                        </div>
                        <FaqEditor/>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div className="admin-grid">
                        <div className="admin-card">
                            <h3>Заголовок послуг</h3>
                            <Field label="Eyebrow" path={['services', 'eyebrow']}/>
                            <Field label="Заголовок" path={['services', 'title']} type="textarea"/>
                            <Field label="Опис" path={['services', 'description']} type="textarea"/>
                            <Field label="Підказка картки" path={['services', 'hintLabel']}/>
                            <Field label="Лейбл звороту картки" path={['services', 'whatIncludedLabel']}/>
                        </div>
                        <ServicesEditor/>
                        <div className="admin-card">
                            <h3>CTA під послугами</h3>
                            <Field label="Eyebrow" path={['services', 'cta', 'eyebrow']}/>
                            <Field label="Заголовок" path={['services', 'cta', 'title']} type="textarea"/>
                            <Field label="Опис" path={['services', 'cta', 'description']} type="textarea"/>
                            <Field label="Кнопка" path={['services', 'cta', 'buttonLabel']}/>
                        </div>
                        <DoctorsEditor/>
                    </div>
                )}

                {activeTab === 'pages' && (
                    <div className="admin-grid">
                        <div className="admin-card">
                            <h3>SEO</h3>
                            <Field label="Home title" path={['seo', 'home', 'title']}/>
                            <Field label="Home description" path={['seo', 'home', 'description']} type="textarea"/>
                            <Field label="About title" path={['seo', 'about', 'title']}/>
                            <Field label="About description" path={['seo', 'about', 'description']} type="textarea"/>
                            <Field label="Services title" path={['seo', 'services', 'title']}/>
                            <Field label="Services description" path={['seo', 'services', 'description']} type="textarea"/>
                            <Field label="Contacts title" path={['seo', 'contacts', 'title']}/>
                            <Field label="Contacts description" path={['seo', 'contacts', 'description']} type="textarea"/>
                        </div>
                        <div className="admin-card">
                            <h3>Сторінка “Про нас”</h3>
                            <Field label="Eyebrow" path={['pages', 'about', 'eyebrow']}/>
                            <Field label="Заголовок" path={['pages', 'about', 'title']} type="textarea"/>
                            <Field label="Опис" path={['pages', 'about', 'description']} type="textarea"/>
                            <Field label="Основний текст" path={['pages', 'about', 'body']} type="textarea" rows={5}/>
                            <Field label="Кнопка" path={['pages', 'about', 'buttonLabel']}/>
                            <ImageEditor title="Фото сторінки" srcPath={['pages', 'about', 'image', 'src']} altPath={['pages', 'about', 'image', 'alt']}/>
                        </div>
                        <TrustList title="Факти на сторінці “Про нас”" path={['pages', 'about', 'facts']}/>
                        <div className="admin-card">
                            <h3>Сторінка контактів</h3>
                            <Field label="Eyebrow" path={['pages', 'contacts', 'eyebrow']}/>
                            <Field label="Заголовок" path={['pages', 'contacts', 'title']} type="textarea"/>
                            <Field label="Опис" path={['pages', 'contacts', 'description']} type="textarea"/>
                        </div>
                        <div className="admin-card">
                            <h3>Форми</h3>
                            <Field label="Контакти: імʼя" path={['forms', 'contact', 'nameLabel']}/>
                            <Field label="Контакти: placeholder імʼя" path={['forms', 'contact', 'namePlaceholder']}/>
                            <Field label="Контакти: телефон" path={['forms', 'contact', 'phoneLabel']}/>
                            <Field label="Контакти: placeholder телефону" path={['forms', 'contact', 'phonePlaceholder']}/>
                            <Field label="Контакти: helper телефону" path={['forms', 'contact', 'phoneHelper']}/>
                            <Field label="Контакти: коментар" path={['forms', 'contact', 'commentLabel']}/>
                            <Field label="Контакти: placeholder коментаря" path={['forms', 'contact', 'commentPlaceholder']} type="textarea"/>
                            <Field label="Контакти: кнопка" path={['forms', 'contact', 'submitLabel']}/>
                            <Field label="Контакти: кнопка під час відправлення" path={['forms', 'contact', 'submittingLabel']}/>
                            <Field label="Контакти: помилка" path={['forms', 'contact', 'errorMessage']} type="textarea"/>
                            <Field label="Контакти: модалка title" path={['forms', 'contact', 'successTitle']}/>
                            <Field label="Контакти: модалка message" path={['forms', 'contact', 'successMessage']} type="textarea"/>
                            <Field label="Запис: імʼя" path={['forms', 'recording', 'nameLabel']}/>
                            <Field label="Запис: placeholder імʼя" path={['forms', 'recording', 'namePlaceholder']}/>
                            <Field label="Запис: телефон" path={['forms', 'recording', 'phoneLabel']}/>
                            <Field label="Запис: placeholder телефону" path={['forms', 'recording', 'phonePlaceholder']}/>
                            <Field label="Запис: helper телефону" path={['forms', 'recording', 'phoneHelper']}/>
                            <Field label="Запис: дата" path={['forms', 'recording', 'dateLabel']}/>
                            <Field label="Запис: кнопка" path={['forms', 'recording', 'submitLabel']}/>
                            <Field label="Запис: кнопка під час відправлення" path={['forms', 'recording', 'submittingLabel']}/>
                            <Field label="Запис: помилка" path={['forms', 'recording', 'errorMessage']} type="textarea"/>
                            <Field label="Запис: модалка title" path={['forms', 'recording', 'successTitle']}/>
                            <Field label="Запис: модалка message" path={['forms', 'recording', 'successMessage']} type="textarea"/>
                        </div>
                    </div>
                )}

                {activeTab === 'json' && (
                    <div className="admin-card admin-card--full">
                        <h3>Повний JSON контенту</h3>
                        <p className="admin-help">Тут можна змінити будь-яке поле, навіть якщо його немає у формах вище.</p>
                        <textarea
                            className="admin-json"
                            spellCheck={false}
                            value={jsonValue}
                            onChange={(event) => {
                                setJsonValue(event.target.value);
                                setIsJsonDirty(true);
                            }}
                        />
                        <div className="admin-actions admin-actions--inline">
                            <button type="button" onClick={() => {
                                setJsonValue(JSON.stringify(draft, null, 2));
                                setIsJsonDirty(false);
                            }}>
                                Оновити з чернетки
                            </button>
                            <button className="admin-primary" type="button" onClick={applyJson}>Застосувати JSON</button>
                        </div>
                    </div>
                )}
            </Container>
        </main>
    );
};

export {AdminPage};
