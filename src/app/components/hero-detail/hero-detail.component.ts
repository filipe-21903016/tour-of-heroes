import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, first, shareReplay, Subject, Subscription, switchMap, tap } from 'rxjs';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ){}

  hero$ = this.route.paramMap.pipe(
    switchMap(params => this.heroService.getHero(Number(params.get('id')))),
    shareReplay(1)
  )

  private _heroSavedSubject$ = new Subject<IHero>();
  heroSavedAction$ = this._heroSavedSubject$.asObservable(); 

  ngOnInit(){
    this.heroSavedAction$.pipe(
      first(),
    )
    .subscribe(() => this.goBack());
  }

  save(hero:IHero): void {
    this._heroSavedSubject$.next(hero);
  }

  goBack(){
    this.location.back();
  }
}
