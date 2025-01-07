export const SITE_NAME = 'Социальная сеть';
export const CLIENT_URL = 'http://localhost:3000';

export const pagesData: IPages = {
    main: {
        name: CLIENT_URL,
        title: 'Главная',
        description: 'Главная страница',
        url: CLIENT_URL,
    },
    login: {
        name: 'login',
        title: 'Авторизация',
        description: 'Страница авторизации',
        url: `${CLIENT_URL}/login`,
    },
    registration: {
        name: 'registration',
        title: 'Регистрация',
        description: 'Страница регистрации',
        url: `${CLIENT_URL}/registration`,
    }
}

export const pagesLinks = {
    main: '/',
    profile: '/profile',
    login: '/login',
    registration: '/registration',
}

interface IPage {
    name: string;
    title?: string;
    description: string;
    keywords?: string;
    url: string;
}

interface IPages {
    [page: string]: IPage;
}