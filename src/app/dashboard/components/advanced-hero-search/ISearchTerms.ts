import { ICountry } from '../../../models/ICountry';
export interface ISearchTerms {
  name: string;
  peopleSaved: number;
  startDate?: string;
  endDate?: string;
  countries?: ICountry[];
}
