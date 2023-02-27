import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { IHero } from '../../../models/IHero';
import { map, Observable, repeat, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent {
  heroes$!: Observable<IHero[]>;
  heroesReload$ = new Subject<void>();

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes().pipe(
      map((heroes) => heroes.sort((p, c) => p.peopleSaved - c.peopleSaved)),
      repeat({ delay: () => this.heroesReload$ })
    );
  }

  onHeroAction() {
    this.heroesReload$.next();
  }

  goCreateHero() {
    this.router.navigate(['/heroes/create'], {
      queryParams: { mode: 'CREATE' },
    });
  }

  protected trackById(index: number, element: IHero) {
    return element.id;
  }
}
