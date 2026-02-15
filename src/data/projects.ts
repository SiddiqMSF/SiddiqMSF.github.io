export type ProjectTag =
    | 'PUBLIC'
    | 'ONGOING'
    | 'PAUSED'
    | 'PROTOTYPE'
    | 'BETA'
    | 'INTERNAL'
    | 'PRIVATE'
    | 'DEPRECATED'
    | 'ARCHIVED';

export type FilterCategory = 'all' | 'public' | 'prototypes' | 'internal' | 'archived';

export interface Project {
    name: string;
    description: string;
    coverImage: string;
    tags: ProjectTag[];
    url: string;
    disabled: boolean;
    filterCategory: FilterCategory;
}

export const projects: Project[] = [
    {
        name: 'BudgetKitab',
        description:
            'A multilingual Web App designed to help students at the Islamic University of Madinah manage their Badal Kutub book allowance. This app provides an intuitive interface for logging book purchases and displays the remaining budget.',
        coverImage: '1.webp',
        tags: ['ONGOING', 'PUBLIC'],
        url: 'https://budgetkitabnew-188ff3.gitlab.io/',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'General Aptitude Test for Undergraduates Simulation',
        description:
            'An Online platform designed to help students prepare for the General Aptitude Test (GAT), which is a crucial requirement for postgraduate admissions in Saudi Arabian universities. This simulation offers a comprehensive and realistic practice environment that mirrors the actual GAT exam.',
        coverImage: '2.webp',
        tags: ['PUBLIC'],
        url: 'https://quduratpsdm.gitlab.io/',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'Portal PPMI Madinah',
        description:
            'Portal data mahasiswa PPMI Madinah. Platform resmi untuk mengelola profil, informasi akademik, dan mengakses formulir penting terkait kemahasiswaan.',
        coverImage: 'portal.png',
        tags: ['PUBLIC'],
        url: 'https://portal.ppmimadinah.com',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'Tarjuman',
        description:
            'Jasa penerjemah tersumpah resmi untuk beasiswa Saudi. Diakui Kemenkumham & Kedutaan.',
        coverImage: 'tarjuman.png',
        tags: ['PUBLIC'],
        url: 'https://tarjuman.org',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'Faraid Academy',
        description:
            'Pelajari Ilmu Faraid (Waris Islam) melalui kursus interaktif, latihan soal, dan kompetisi.',
        coverImage: 'faraidacademy.png',
        tags: ['PUBLIC'],
        url: 'https://faraidacademy.com',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'DurusNabawi',
        description:
            'Designed to provide users with detailed and up-to-date information about the weekly durus held at Masjid Nabawi in Madinah, Saudi Arabia. The app ensures that all schedules are live and current, helping users stay informed and plan their attendance accordingly.',
        coverImage: '4.webp',
        tags: ['PROTOTYPE', 'BETA'],
        url: 'https://almutarjim.gitlab.io/durusnabawi',
        disabled: false,
        filterCategory: 'prototypes',
    },
    {
        name: 'Khaffif (Arabic Diacritics Remover)',
        description:
            'An online tool designed to simplify Arabic text by removing all diacritical marks (tashkeel) from the input.',
        coverImage: 'khaffif.webp',
        tags: ['PUBLIC'],
        url: 'https://almutarjim.gitlab.io/khaffif',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'FiqhAI',
        description:
            'An artificial intelligence system designed to provide answers to questions related to Fiqh, the Islamic jurisprudence. It utilizes advanced machine learning algorithms to interpret and respond to user inquiries with accurate and contextually relevant information from Islamic legal sources.',
        coverImage: '3.webp',
        tags: ['PROTOTYPE'],
        url: 'http://fiqhai.com/chat',
        disabled: false,
        filterCategory: 'prototypes',
    },
    {
        name: 'RandQuran+',
        description:
            'An advanced app designed to support Quran memorizers with customizable random verse selection. Users can specify the range of pages, juz (sections), or surahs (chapters) from which the verses are chosen, making it a versatile tool for focused and effective memorization practice.',
        coverImage: 'randquranplus.webp',
        tags: ['PROTOTYPE'],
        url: 'https://almutarjim.github.io/',
        disabled: false,
        filterCategory: 'prototypes',
    },
    {
        name: 'RandQuran',
        description:
            'Discover a random Quranic verse and listen to its recitation every time you load the page. Helps Memorizers of the Quran to Review their memorization.',
        coverImage: 'randquran.webp',
        tags: ['PUBLIC'],
        url: 'https://randquran.github.io/',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'Medina Min Temp Forecast',
        description:
            "Explore the upcoming week's daily minimum temperatures in Medina, Saudi Arabia, with a glance at our concise and user-friendly page.",
        coverImage: 'min.webp',
        tags: ['PUBLIC'],
        url: 'https://almutarjim.gitlab.io/min/',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'Medina Weather Now',
        description:
            'A Simple, user-friendly page designed to provide you with the most accurate and up-to-date temperature information for the holy city of Medina.',
        coverImage: 'istasqa.webp',
        tags: ['PUBLIC'],
        url: 'https://almutarjim.gitlab.io/istasqa',
        disabled: false,
        filterCategory: 'public',
    },
    {
        name: 'Indonesian Students Database - Medina',
        description:
            'A comprehensive database designed to store and manage information about Indonesian students studying in Medina, Saudi Arabia. Users can query the database by entering a name, and it will display all matching records along with detailed information such as contact details, academic program, and other relevant data.',
        coverImage: 'db.webp',
        tags: ['INTERNAL'],
        url: '',
        disabled: true,
        filterCategory: 'internal',
    },
    {
        name: 'Customer Relationship Management (CRM) Software Klinik Assyifa Therapy Center',
        description:
            'This specialized CRM software streamlines patient management at Klinik Assyifa Therapy Center. It includes features for appointment scheduling, patient record keeping, billing, and staff management. The intuitive interface ensures efficient operations and high-quality patient care.',
        coverImage: 'crm.webp',
        tags: ['INTERNAL', 'PRIVATE'],
        url: '',
        disabled: true,
        filterCategory: 'internal',
    },
    {
        name: 'Inventory Management Software for Captspice, Inc.',
        description:
            'A custom-built, in-house inventory management software designed to streamline and optimize the management of Captspice\'s export operations. This comprehensive tool provides real-time insights and control over key business processes, including inventory tracking, order management, supply chain coordination, and production monitoring.',
        coverImage: 'admin.webp',
        tags: ['INTERNAL', 'PRIVATE'],
        url: '',
        disabled: true,
        filterCategory: 'internal',
    },
    {
        name: 'BudgetKitab (Old)',
        description: 'Obsolete.',
        coverImage: 'budgetkitabold.webp',
        tags: ['DEPRECATED', 'ARCHIVED'],
        url: 'https://budgetkitab.gitlab.io',
        disabled: false,
        filterCategory: 'archived',
    },
];
