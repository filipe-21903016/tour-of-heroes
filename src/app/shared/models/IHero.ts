import { ICountry } from './ICountry';
export interface IHero {
  id: number;
  name: string;
  date: string;
  peopleSaved: number;
  countryId: number;
  country?: ICountry;
  documentId?: number;
}
