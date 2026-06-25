import {FC} from 'react';

import {Seo, Services, ServicesBottomContent} from "../../components";
import {createDentalClinicSchema, useContent} from '../../content';

const ServicesPage: FC = () => {
    const {content} = useContent();

    return (
        <main className="main">
            <Seo
                canonicalPath="/services"
                description={content.seo.services.description}
                schema={createDentalClinicSchema(content)}
                title={content.seo.services.title}
            />

            <Services/>
            <ServicesBottomContent/>
        </main>
    );
};

export {ServicesPage};
