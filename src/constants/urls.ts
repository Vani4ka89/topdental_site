// REACT_APP_API_URL='' (empty string, e.g. when server/app.cjs serves the
// build and the API from the same origin) means "same domain, no prefix" -
// only fall back to the old external API when the variable is unset entirely.
const baseURL = process.env.REACT_APP_API_URL !== undefined
    ? process.env.REACT_APP_API_URL
    : 'https://topdental-api-2a1bf2e56e90.herokuapp.com/';

const users = '/users';

const urls = {
    firstForm: `${users}/first_form`,
    secondForm: `${users}/second_form`
};

export {
    baseURL,
    urls
};