import { DOCUMENT, inject, Service, signal } from '@angular/core';

// Closed set of specific user roles
export enum Modes {
  Light = 'light',
  Dark = 'dark'
}

// Closed set of specific user roles
export enum Themes {
  Mountain = 'mountain',
  Jeju = 'jeju',
  SeoulCherryBlossom = 'seoul-cherry-blossom'
}

//산
//제주
//벚꽃

@Service()
export class ThemeService {
    private document = inject(DOCUMENT);
    
    public mode = signal(Modes.Light);
    public theme = signal(Themes.Mountain);

    private setMode(mode: Modes) {
        const root = this.document.documentElement;

        this.mode.update(() => mode)
        root.style.setProperty('--color-scheme', this.mode())
        localStorage.setItem('mode', this.mode());
    }

    private setTheme(theme: Themes) {
        const root = this.document.documentElement;

        Object.values(Themes).forEach((enumTheme) => {
            if (enumTheme !== theme) {
                root.classList.remove(enumTheme);
            }
        })

        this.theme.update(() => theme)
        root.classList.add(this.theme())
        localStorage.setItem('theme', this.theme());
    }
    
    public toggleMode() {
        const root = this.document.documentElement;

        if (this.mode() === Modes.Light) {
            this.setMode(Modes.Dark)
        }
        else {
            this.setMode(Modes.Light)
        }
    }

    public toggleTheme() {
        const root = this.document.documentElement;

        if (this.theme() === Themes.Mountain) {
            this.setTheme(Themes.Jeju)
        }
        else if (this.theme() === Themes.Jeju) {
            this.setTheme(Themes.SeoulCherryBlossom)
        }
        else {
            this.setTheme(Themes.Mountain)
        }
    }

    constructor() {
        if (localStorage.getItem('mode')) {
            this.setMode(localStorage.getItem('mode')! as Modes)
        }
        else {
            this.setMode(this.mode())
        }

        if (localStorage.getItem('theme')) {
            this.setTheme(localStorage.getItem('theme')! as Themes)
        }
        else {
            this.setTheme(this.theme())
        }
        
    }
}
