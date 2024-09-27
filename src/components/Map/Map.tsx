import {FC} from 'react';

const Map: FC = () => {
    return (
        <iframe title={'map'}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7732761835105!2d25.613749776542626!3d49.545431071433526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473031eacc9c2c2f%3A0x4f7b7abec0d6a973!2zVG9wRGVudGFsL9Ci0L7Qv9CU0LXQvdGC0LDQuw!5e0!3m2!1suk!2sua!4v1727214411513!5m2!1suk!2sua"
                width="100%" height="200" style={{border: 0}} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    );
};

export {Map};