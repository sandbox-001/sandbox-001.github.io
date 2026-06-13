import { DOCUMENT, inject, Service, signal } from '@angular/core';

@Service()
export class ThemeService {
    private document = inject(DOCUMENT);
    
    public mode = signal('light');
    public theme = signal('산');
    
    
    public toggleMode() {
        const root = this.document.documentElement;

        if (this.mode() === 'light') {
            this.mode.update(() => 'dark')
        }
        else {
            this.mode.update(() => 'light')
        }

        root.style.setProperty('--color-scheme', this.mode())
    }

    public toggleTheme() {
        const root = this.document.documentElement;

        if (this.theme() === '산') {
            this.theme.update(() => '제주')
            root.classList.add('jeju')
        }
        else if (this.theme() === '제주') {
            root.classList.remove('jeju')
            this.theme.update(() => '벚꽃')
            root.classList.add('seoul-cherry-blossom')
        }
        else {
            this.theme.update(() => '산')
            root.classList.remove('seoul-cherry-blossom')
        }
    }
}
