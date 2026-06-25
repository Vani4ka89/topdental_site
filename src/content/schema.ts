import {SiteContent} from './types';

const createDentalClinicSchema = (content: SiteContent) => {
    const primaryLocation = content.clinic.locations[0];

    return {
        '@context': 'https://schema.org',
        '@type': ['Dentist', 'LocalBusiness'],
        name: content.clinic.name,
        url: 'https://topdental.te.ua',
        logo: 'https://topdental.te.ua/logo512.png',
        image: 'https://topdental.te.ua/logo512.png',
        telephone: content.clinic.phone,
        email: content.clinic.email,
        priceRange: '$$',
        medicalSpecialty: ['Dentistry', 'Orthodontics', 'Implantology'],
        foundingDate: content.clinic.founded,
        areaServed: ['Тернопіль', 'Плотича'],
        address: {
            '@type': 'PostalAddress',
            streetAddress: primaryLocation?.address || '',
            addressLocality: 'Тернопіль',
            postalCode: '46002',
            addressCountry: 'UA',
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '19:00',
            },
        ],
        sameAs: [
            content.clinic.socials.facebook,
            content.clinic.socials.instagram,
            content.clinic.socials.telegram,
        ],
    };
};

export {createDentalClinicSchema};
