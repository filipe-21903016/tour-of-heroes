import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ICountry } from 'src/app/shared/models/ICountry';
import { IHero } from 'src/app/shared/models/IHero';
import { ISearchTerms } from 'src/app/dashboard/components/advanced-hero-search/ISearchTerms';
import { CountryService } from 'src/app/shared/services/country.service';
import { HeroService } from 'src/app/heroes/services/hero.service';

@Component({
  selector: 'app-advanced-hero-search',
  templateUrl: './advanced-hero-search.component.html',
  styleUrls: ['./advanced-hero-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedHeroSearchComponent implements OnInit {
  searchForm!: FormGroup;
  filteredHeroes$!: Observable<IHero[]>;
  heroesReload$ = new Subject<void>();
  countries$ = this.countryService.getCountries();

  constructor(
    private heroService: HeroService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    //initialize form groups & form controls
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      peopleSaved: new FormControl(0),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      selectedCountries: new FormControl([]),
    });

    //when form changes get heroes based on searchTerms
    this.filteredHeroes$ = combineLatest([
      this.searchForm.valueChanges,
      this.heroesReload$.pipe(startWith(null)),
    ]).pipe(
      map(([formData]) => formData),
      map(
        (data) =>
          ({
            name: data.name,
            peopleSaved: data.peopleSaved,
            startDate: data.startDate ? data.startDate : undefined,
            endDate: data.endDate ? data.endDate : undefined,
            countries: data.selectedCountries,
          } as ISearchTerms)
      ),
      debounceTime(300),
      // distinctUntilChanged((prev, curr) => this.compareSearchTerms(prev, curr)),
      tap((searchTerms) => console.log('Search', searchTerms)),
      switchMap((searchTerms) => this.heroService.searchHeroes(searchTerms))
    );
  }

  private compareSearchTerms(prev: ISearchTerms, curr: ISearchTerms): boolean {
    return (
      prev.name === curr.name &&
      prev.startDate === curr.startDate &&
      prev.endDate === curr.endDate &&
      prev.peopleSaved === curr.peopleSaved &&
      JSON.stringify(prev.countries) === JSON.stringify(curr.countries)
    );
  }

  protected triggerHeroesReload() {
    this.heroesReload$.next();
  }

  protected trackById(index: number, element: IHero | ICountry) {
    return element.id;
  }
}
