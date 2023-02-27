import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  first,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { IHero } from 'src/app/shared/models/IHero';
import { CountryService } from 'src/app/shared/services/country.service';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroDetailComponent {
  mode$!: Observable<'CREATE' | 'EDIT' | 'VIEW'>;
  hero$!: Observable<IHero>;
  pageTitle$!: Observable<string>;
  submitButtonText$!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.mode$ = this.route.queryParams.pipe(map((params) => params['mode']));

    this.hero$ = combineLatest([
      this.route.paramMap,
      this.mode$.pipe(take(1)),
    ]).pipe(
      switchMap(([params, mode]) =>
        mode === 'CREATE'
          ? of({} as IHero)
          : this.heroService.getHero(Number(params.get('id')))
      ),
      shareReplay(1)
    );

    this.pageTitle$ = this.mode$.pipe(
      switchMap((mode) =>
        mode === 'VIEW'
          ? this.hero$.pipe(map((hero) => hero.name.toUpperCase()))
          : of(`${mode} Hero`)
      ),
      startWith('LOADING')
    );

    this.submitButtonText$ = this.mode$.pipe(
      map((mode) =>
        mode === 'VIEW'
          ? 'Edit'
          : mode == 'EDIT'
          ? 'Save'
          : `${mode.toLocaleLowerCase()} hero`
      )
    );
  }

  countries$ = this.countryService.getCountries();

  private _heroSavedSubject$ = new Subject<IHero>();
  heroSavedAction$ = this._heroSavedSubject$
    .pipe(switchMap((hero) => this.heroService.updateHero(hero)))
    .pipe(first())
    .subscribe(() => this.goBack());

  private _heroCreateSubject$ = new Subject<IHero>();
  heroCreateAction$ = this._heroCreateSubject$
    .pipe(
      map((hero) => ({
        ...hero,
        id: undefined,
        country: undefined,
      })),
      switchMap((hero) => this.heroService.addHero(hero))
    )
    .pipe(first())
    .subscribe(() => this.goBack());

  save(hero: IHero): void {
    this.mode$.pipe(take(1)).subscribe((mode) => {
      if (mode === 'CREATE') this._heroCreateSubject$.next(hero);
      else if (mode === 'EDIT') this._heroSavedSubject$.next(hero);
      else
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { mode: 'EDIT' },
        });
    });
  }

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
