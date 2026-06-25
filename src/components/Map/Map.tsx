import {FC} from 'react';
import {useContent} from '../../content';

const Map: FC = () => {
    const {content} = useContent();
    const location = content.clinic.locations[0];

    if (!location?.mapSrc) {
        return null;
    }

    return (
        <iframe title={location.mapTitle}
                src={location.mapSrc}
                width="100%" height="180" style={{border: 0}} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    );
};

export {Map};
