import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from './shared/services/messages.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  darkMode = false;

  constructor(
    protected translate: TranslateService,
    private messageService: MessageService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private themeService: ThemeService
  ) {
    this.matIconRegistry.addSvgIcon(
      'PT',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/PT_flag.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'EN',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/UK_flag.svg'
      )
    );
  }

  ngOnInit() {
    this.themeService.loadTheme(this.darkMode ? 'dark' : 'light');
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.themeService.loadTheme(this.darkMode ? 'dark' : 'light');
  }

  setLang(lang: 'en' | 'pt') {
    // console.log(lang);
    this.messageService.clear();
    this.translate.use(lang);
  }
}
