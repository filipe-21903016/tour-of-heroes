import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImageSourcePipe } from './utils/hero-image-source.pipe';
import { HoverEffectDirective } from './utils/hover-effect.directive';
import { TeapotComponent } from './components/teapot/teapot.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessagesComponent } from './components/messages/messages.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    HeroCardComponent,
    HeroImageSourcePipe,
    HoverEffectDirective,
    TeapotComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    TranslateModule.forChild(),
  ],
  exports: [
    HeroCardComponent,
    HeroImageSourcePipe,
    HoverEffectDirective,
    TeapotComponent,
    MessagesComponent,
  ],
})
export class SharedModule {}
