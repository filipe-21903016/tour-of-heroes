import { BaseRepo } from './BaseRepo';
import { ICountry } from '../../shared/models/ICountry';

export abstract class BaseCountryRepo extends BaseRepo<ICountry> {}
