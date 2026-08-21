export interface EditableImage {
    alt: string;
    src: string;
}

export interface NavigationItem {
    label: string;
    to: string;
}

export interface TrustItem {
    label: string;
    value: string;
}

export interface HighlightItem {
    text: string;
    title: string;
}

export interface ReviewItem {
    comment: string;
    date: string;
    image: EditableImage;
    name: string;
    rating: number;
    source: string;
}

export interface FaqItem {
    answer: string;
    id: string;
    question: string;
}

export interface DoctorItem {
    badges: string[];
    credentials: string[];
    description: string;
    image: EditableImage;
    name: string;
    role: string;
}

export interface ServiceItem {
    description: string;
    details: string[];
    iconSvg?: string;
    result: string;
    title: string;
}

export interface ClinicLocation {
    address: string;
    mapSrc: string;
    mapTitle: string;
    name: string;
    phone: string;
    phoneDisplay: string;
}

export interface SeoContent {
    description: string;
    title: string;
}

export interface SiteContent {
    assets: {
        logo: EditableImage;
    };
    clinic: {
        cityLine: string;
        consultation: string;
        email: string;
        founded: string;
        hours: {
            saturday: string;
            short: string;
            sunday: string;
            weekdays: string;
        };
        locations: ClinicLocation[];
        name: string;
        phone: string;
        phoneDisplay: string;
        socials: {
            facebook: string;
            instagram: string;
            telegram: string;
        };
    };
    doctors: {
        items: DoctorItem[];
    };
    footer: {
        contactsTitle: string;
        copyright: string;
        ctaLabel: string;
        description: string;
        eyebrow: string;
        hoursTitle: string;
        navigationTitle: string;
        title: string;
    };
    forms: {
        recording: {
            commentLabel: string;
            commentPlaceholder: string;
            dateLabel: string;
            errorMessage: string;
            nameLabel: string;
            namePlaceholder: string;
            phoneHelper: string;
            phoneLabel: string;
            phonePlaceholder: string;
            submitLabel: string;
            submittingLabel: string;
            successMessage: string;
            successTitle: string;
        };
    };
    home: {
        about: {
            buttonLabel: string;
            description: string;
            eyebrow: string;
            highlights: HighlightItem[];
            image: EditableImage;
            title: string;
        };
        contact: {
            addressLabel: string;
            description: string;
            emailLabel: string;
            eyebrow: string;
            hoursLabel: string;
            phoneLabel: string;
            title: string;
        };
        cover: {
            buttonLabel: string;
            description: string;
            eyebrow: string;
            image: EditableImage;
            title: string;
        };
        hero: {
            description: string;
            eyebrow: string;
            image: EditableImage;
            primaryCtaLabel: string;
            quickLocation: string;
            secondaryCtaLabel: string;
            title: string;
            trustItems: TrustItem[];
        };
        questions: {
            description: string;
            eyebrow: string;
            items: FaqItem[];
            title: string;
        };
        recording: {
            description: string;
            eyebrow: string;
            title: string;
        };
        reviews: {
            description: string;
            eyebrow: string;
            items: ReviewItem[];
            title: string;
        };
        slider: {
            description: string;
            eyebrow: string;
            images: EditableImage[];
            title: string;
        };
    };
    navigation: {
        brandPrefix: string;
        brandSuffix: string;
        brandTagline: string;
        ctaLabel: string;
        main: NavigationItem[];
        mobileCtaLabel: string;
    };
    pages: {
        about: {
            body: string;
            buttonLabel: string;
            description: string;
            eyebrow: string;
            facts: TrustItem[];
            image: EditableImage;
            title: string;
        };
        contacts: {
            description: string;
            eyebrow: string;
            title: string;
        };
    };
    seo: {
        about: SeoContent;
        contacts: SeoContent;
        home: SeoContent;
        services: SeoContent;
    };
    services: {
        cta: {
            buttonLabel: string;
            description: string;
            eyebrow: string;
            title: string;
        };
        description: string;
        eyebrow: string;
        hintLabel: string;
        items: ServiceItem[];
        title: string;
        whatIncludedLabel: string;
    };
}
