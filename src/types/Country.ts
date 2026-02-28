export type Country = {
  name: string;
  code: string;
};

export interface CountryListProps {
  countries: Country[];
}
