import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImageSourcePipe } from './utils/hero-image-source.pipe';
import { HoverEffectDirective } from './utils/hover-effect.directive';
import { TeapotComponent } from '../components/teapot/teapot.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeroCardComponent,
    HeroImageSourcePipe,
    HoverEffectDirective,
    TeapotComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    HeroCardComponent,
    HeroImageSourcePipe,
    HoverEffectDirective,
    TeapotComponent,
  ],
})
export class SharedModule {}
