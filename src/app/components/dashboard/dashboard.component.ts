import { Component } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent{
  heroes$!:Observable<IHero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit(){
    this.heroes$ = this.heroService.getHeroes().pipe(
      map(heroes => heroes.slice(1,5)),
      shareReplay(1)
    );
  }
}