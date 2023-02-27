import { Observable } from 'rxjs';
import { BaseRepo } from './BaseRepo';
import { IHero } from './IHero';
import { ISearchTerms } from '../dashboard/components/advanced-hero-search/ISearchTerms';

export abstract class BaseHeroRepo extends BaseRepo<IHero> {
  abstract searchHero(terms: ISearchTerms): Observable<IHero[]>;
}
