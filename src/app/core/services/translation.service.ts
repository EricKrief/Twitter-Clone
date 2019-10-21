import { Injectable } from '@angular/core';
import { Language } from '../models/language';
import { HttpClient } from '@angular/common/http';
import { LanguagesResponse } from '../models/api-respones';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    //If this is the first time loading our app, then we don't want to use translation pipe.
    private _isInitialLoad = new BehaviorSubject<boolean>(true);
    public readonly isInitialLoad = this._isInitialLoad.asObservable();
    private _currentLanguage = new BehaviorSubject<string>(undefined);
    public readonly currentLanguage = this._currentLanguage.asObservable();
    languageTitles: string[] = [];
    languages: Language[] = [];


    constructor(private http: HttpClient) {
        this.http.get<LanguagesResponse>('assets/languages.json').subscribe(
            data => {
                this.languages = data.languages;
                this._currentLanguage.next(data.defaultLanguage);
                this.languages.forEach(language => this.languageTitles.push(language.title));
            });
    }

    getTranslatedWord(word: string, language: string): string {
        return this.languages.find(l => l.title === language).wordMapping[word];
    }

    changeLanguage(language: string): void {
        this._isInitialLoad.next(false);
        this._currentLanguage.next(language);
    }

    getLanguageTitles(): string[] {
        return this.languageTitles;
    }

}