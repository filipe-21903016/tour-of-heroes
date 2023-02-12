import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroService } from './services/hero.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/messages.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { RemoteHeroRepo } from './models/RemoteHeroRepo';
import { BaseHeroRepo } from './models/BaseHeroRepo';
import { MockHeroRepo } from './models/MockHeroRepo';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation:false}
    )
  ],
  providers: [
    HeroService,
    MessageService,
    InMemoryDataService,
    // {provide: BaseHeroRepo, useClass: RemoteHeroRepo}
    {provide: BaseHeroRepo, useClass: MockHeroRepo}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }