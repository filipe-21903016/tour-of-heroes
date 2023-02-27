import { ICountry } from '../../../shared/models/ICountry';
export interface ISearchTerms {
  name: string;
  peopleSaved: number;
  startDate?: string;
  endDate?: string;
  countries?: ICountry[];
}
