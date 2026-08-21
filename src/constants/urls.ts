// REACT_APP_API_URL='' (empty string, e.g. when server/app.cjs serves the
// build and the API from the same origin) means "same domain, no prefix" -
// only fall back to the old external API when the variable is unset entirely.
const baseURL = process.env.REACT_APP_API_URL !== undefined
    ? process.env.REACT_APP_API_URL
    : 'https://topdental-a1fea191ddc7.herokuapp.com/';

const users = '/users';

const urls = {
    secondForm: `${users}/second_form`
};

// Онлайн-запис на прийом через CliniCards - кнопки "Записатись" по сайту
// ведуть сюди замість форми на секції #recording.
const bookingUrl = 'https://cliniccards.com/booking/dVeHH7gVXJi8x1lmvhQRDb2wJvj7kwzR';

export {
    baseURL,
    bookingUrl,
    urls
};