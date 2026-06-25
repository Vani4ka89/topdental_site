const clinic = {
    name: 'TopDental',
    founded: '2015',
    email: 'topdentalternopil@gmail.com',
    phone: '+380962270530',
    phoneDisplay: '+38 (096) 227 05 30',
    consultation: 'Консультація та план лікування',
    hours: {
        short: 'Пн-Пт 10:00-19:00',
        weekdays: 'Понеділок - пʼятниця: 10:00 - 19:00',
        saturday: 'Субота: за попереднім записом',
        sunday: 'Неділя: вихідний',
    },
    locations: [
        {
            name: 'TopDental Тернопіль',
            address: 'вул. Антона Монастирського, 40, Тернопіль, Тернопільська область, 46002',
            phone: '+380962270530',
            phoneDisplay: '+38 (096) 227 05 30',
            mapTitle: 'Карта TopDental Тернопіль',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.773276183511!2d25.61374977654263!3d49.54543107143351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473031eacc9c2c2f%3A0x4f7b7abec0d6a973!2zVG9wRGVudGFsL9Ci0L7Qv9CU0LXQvdGC0LDQuw!5e0!3m2!1suk!2sua!4v1727543853561!5m2!1suk!2sua',
        },
        {
            name: 'TopDental Плотича',
            address: 'вул. Садова, 4, Плотича, Тернопільська область, 47704',
            phone: '+380966754235',
            phoneDisplay: '+38 (096) 675 42 35',
            mapTitle: 'Карта TopDental Плотича',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.607416161795!2d25.55829537654734!3d49.62400547144617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47303073a3e72fc3%3A0xc5cbe3ee6bedefc0!2z0LLRg9C70LjRhtGPINCh0LDQtNC-0LLQsCwgNCwg0J_Qu9C-0YLQuNGH0LAsINCi0LXRgNC90L7Qv9GW0LvRjNGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA0NzcwNA!5e0!3m2!1suk!2sua!4v1727543467228!5m2!1suk!2sua',
        },
    ],
    socials: {
        facebook: 'https://www.facebook.com/p/%D0%9F%D1%80%D0%B8%D0%B2%D0%B0%D1%82%D0%BD%D0%B0-%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-TopDental-100063561343890/',
        instagram: 'https://instagram.com/topdentalternopil',
        telegram: 'https://t.me/TopDentalTernopil',
    },
};

const dentalClinicSchema = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: clinic.name,
    url: 'https://topdental.te.ua',
    logo: 'https://topdental.te.ua/logo512.png',
    image: 'https://topdental.te.ua/logo512.png',
    telephone: clinic.phone,
    email: clinic.email,
    priceRange: '$$',
    medicalSpecialty: ['Dentistry', 'Orthodontics', 'Implantology'],
    foundingDate: clinic.founded,
    areaServed: ['Тернопіль', 'Плотича'],
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'вул. Антона Монастирського, 40',
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
    sameAs: [clinic.socials.facebook, clinic.socials.instagram, clinic.socials.telegram],
};

export {clinic, dentalClinicSchema};
