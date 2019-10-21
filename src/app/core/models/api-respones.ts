import { Language } from './language';

export interface RegisterResponse {
    user: {
        _id: string,
        username: string,
        email: string,
        avatarUrl: string,
        registrationDate: string,
        lastLoginDate: string
    },
    token: string
}

export interface LoginResponse {
    username: string,
    token: string
}

export interface ToggleStarResponse {
    stars: number,
    starredByMe: boolean
}

export interface LanguagesResponse {
    languages: Language[],
    defaultLanguage: string
}