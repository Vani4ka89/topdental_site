// Shared by server/forms-server.cjs (standalone dev API) and server/app.cjs
// (unified production server) so the validation/email logic lives in one place.
const express = require('express');
const nodemailer = require('nodemailer');
const Joi = require('joi');

const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === 'true';

const mailTo = process.env.MAIL_TO || 'ivan.tym4ak@gmail.com';
const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER || 'ivan.tym4ak@gmail.com';
// No hardcoded fallback here on purpose - SMTP_SERVICE/SMTP_USER/SMTP_PASS
// must come from the environment (see .env.example). Without them,
// buildTransporter() below falls back to console-only logging instead of
// silently using a baked-in account/password.
const smtpService = process.env.SMTP_SERVICE || '';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';

// Same rules as src/validators/*.ts, kept in sync so the server never trusts
// data the client-side form would have rejected.
const nameSchema = Joi.string().pattern(/^[a-zA-Zа-яА-ЯіІїЇ ]{1,100}$/).min(2).max(40).required().messages({
    'string.pattern.base': 'Вкажіть імʼя літерами',
    'string.min': 'Імʼя має містити щонайменше 2 літери',
    'string.max': 'Імʼя має містити не більше 40 літер',
    'string.empty': 'Імʼя обовʼязкове',
});

const phoneSchema = Joi.string().pattern(/^(\+?(38|48|39|34|49|1))?0\d{9}$/).required().messages({
    'string.pattern.base': 'Вкажіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX',
    'string.empty': 'Телефон обовʼязковий',
});

const firstFormSchema = Joi.object({
    name: nameSchema,
    phoneNumber: phoneSchema,
    comment: Joi.string().allow('').optional(),
});

const secondFormSchema = Joi.object({
    name: nameSchema,
    phoneNumber: phoneSchema,
    date: Joi.string().required().messages({'string.empty': 'Оберіть бажану дату'}),
});

const buildTransporter = () => {
    // Shorthand for well-known providers (e.g. SMTP_SERVICE=gmail) - nodemailer
    // resolves the correct host/port/TLS settings for the named service itself.
    if (smtpService) {
        return nodemailer.createTransport({
            service: smtpService,
            auth: {user: smtpUser, pass: smtpPass},
        });
    }

    if (smtpHost) {
        return nodemailer.createTransport({
            host: smtpHost,
            port: Number(smtpPort || 587),
            secure: smtpSecure,
            auth: smtpUser
                ? {user: smtpUser, pass: smtpPass}
                : undefined,
        });
    }

    console.warn(
        '[forms] SMTP_HOST/SMTP_SERVICE is not set — emails will only be logged to the console, not actually sent.\n' +
        '[forms] Set SMTP_SERVICE (or SMTP_HOST), SMTP_USER and SMTP_PASS (see .env.example) to deliver real emails.',
    );

    return nodemailer.createTransport({jsonTransport: true});
};

const transporter = buildTransporter();

// Brand palette, kept in sync with src/layouts/MainLayout/main-layout.css.
const brand = {
    ink: '#12171a',
    graphite: '#253037',
    muted: '#66747c',
    soft: '#eef4f3',
    surface: '#f8faf8',
    line: 'rgba(37, 48, 55, 0.12)',
    blueStrong: '#0f6f82',
    teal: '#63c2bc',
    warmWhite: '#fbfaf7',
};

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatSubmittedAt = (date) => date.toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'long',
    timeStyle: 'short',
});

// Table-based layout with inline styles — the only markup email clients
// (Gmail, Outlook, Apple Mail) render consistently.
const buildEmailHtml = ({heading, intro, fields, submittedAt}) => {
    const rows = fields.map(([label, value, href]) => `
        <tr>
            <td style="padding:14px 0;border-bottom:1px solid ${brand.line};width:150px;vertical-align:top;">
                <span style="font:600 13px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${brand.muted};text-transform:uppercase;letter-spacing:.04em;">${escapeHtml(label)}</span>
            </td>
            <td style="padding:14px 0;border-bottom:1px solid ${brand.line};vertical-align:top;">
                <span style="font:500 16px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${brand.ink};">${href ? `<a href="${href}" style="color:${brand.blueStrong};text-decoration:none;">${escapeHtml(value)}</a>` : escapeHtml(value)}</span>
            </td>
        </tr>`).join('');

    return `<!doctype html>
<html lang="uk">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${brand.surface};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.surface};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.warmWhite};border-radius:16px;overflow:hidden;border:1px solid ${brand.line};">
<tr>
<td style="background:linear-gradient(135deg,${brand.blueStrong},${brand.teal});padding:28px 32px;">
<span style="font:700 20px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;letter-spacing:.01em;">TopDental</span><br/>
<span style="font:500 14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:rgba(255,255,255,.9);">${escapeHtml(heading)}</span>
</td>
</tr>
<tr>
<td style="padding:28px 32px 8px;">
<p style="margin:0 0 18px;font:400 15px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${brand.graphite};">${escapeHtml(intro)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
</td>
</tr>
<tr>
<td style="padding:20px 32px 28px;">
<p style="margin:0;font:400 12px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${brand.muted};">
Подано ${escapeHtml(submittedAt)} · автоматичний лист із сайту topdental.com.ua, відповідати на нього не потрібно — зв'яжіться з клієнтом за вказаним телефоном.
</p>
</td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`;
};

const sendFormEmail = async ({heading, intro, fields}) => {
    const submittedAt = formatSubmittedAt(new Date());
    const text = [
        `TopDental — ${heading}`,
        intro,
        '',
        ...fields.map(([label, value]) => `${label}: ${value}`),
        '',
        `Подано: ${submittedAt}`,
    ].join('\n');
    const html = buildEmailHtml({heading, intro, fields, submittedAt});
    const subject = `${heading} — TopDental`;

    const info = await transporter.sendMail({from: `TopDental — Сайт <${mailFrom}>`, to: mailTo, subject, text, html});

    if (info.message) {
        // jsonTransport fallback used when SMTP isn't configured.
        console.log(`[forms] Would send email to ${mailTo}:\n${text}`);
    } else {
        console.log(`[forms] Email sent to ${mailTo} (messageId: ${info.messageId})`);

        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log(`[forms] Preview: ${previewUrl}`);
        }
    }

    return info;
};

const asyncHandler = (handler) => (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
};

const createFormsRouter = () => {
    const router = express.Router();

    router.get('/health', (request, response) => {
        response.json({ok: true});
    });

    // Presence-only diagnostics (no secret values ever returned) - lets you
    // confirm the mail config on a deploy without needing shell/CLI access
    // to the host. Safe to leave public: it never reveals SMTP_PASS etc.
    router.get('/mail-status', (request, response) => {
        const mask = (value) => {
            if (!value) {
                return null;
            }

            const [user, domain] = String(value).split('@');
            return domain ? `${user.slice(0, 2)}***@${domain}` : `${value.slice(0, 2)}***`;
        };

        response.json({
            transport: smtpService
                ? `service:${smtpService}`
                : smtpHost
                    ? `host:${smtpHost}:${smtpPort || 587}`
                    : 'console-only (SMTP not configured - emails are NOT sent)',
            smtpUserSet: Boolean(smtpUser),
            smtpPassSet: Boolean(smtpPass),
            mailTo: mask(mailTo),
            mailFrom: mask(mailFrom),
        });
    });

    router.post('/users/first_form', asyncHandler(async (request, response) => {
        const {error, value} = firstFormSchema.validate(request.body || {}, {abortEarly: false, stripUnknown: true});

        if (error) {
            response.status(400).json({error: 'Validation failed', details: error.details.map((d) => d.message)});
            return;
        }

        await sendFormEmail({
            heading: 'Нова заявка з форми звʼязку',
            intro: 'На сайті залишили заявку через форму звʼязку. Дані клієнта:',
            fields: [
                ['Імʼя', value.name],
                ['Телефон', value.phoneNumber, `tel:${value.phoneNumber}`],
                ['Коментар', value.comment || '—'],
            ],
        });

        response.json({ok: true});
    }));

    router.post('/users/second_form', asyncHandler(async (request, response) => {
        const {error, value} = secondFormSchema.validate(request.body || {}, {abortEarly: false, stripUnknown: true});

        if (error) {
            response.status(400).json({error: 'Validation failed', details: error.details.map((d) => d.message)});
            return;
        }

        await sendFormEmail({
            heading: 'Новий запис на прийом',
            intro: 'На сайті записались на прийом. Дані клієнта:',
            fields: [
                ['Імʼя', value.name],
                ['Телефон', value.phoneNumber, `tel:${value.phoneNumber}`],
                ['Бажана дата', value.date],
            ],
        });

        response.json({ok: true});
    }));

    return router;
};

module.exports = {createFormsRouter};
