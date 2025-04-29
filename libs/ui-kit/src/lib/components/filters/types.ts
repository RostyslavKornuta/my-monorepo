export type FilterType = 'CHECKBOX' | 'COLOR' | 'STRING'

export type FilterValue = string | Array<any>

export interface Filter {
  title: string;
  code: string;
  type: FilterType;
  options: FilterOption[];
}

export interface FilterOption {
  title: string;
  value: string;
}

export const toFilterOption = (title: string, value: string): FilterOption => ({ title, value });

export interface FilterResult {
  code: string;
  type: FilterType;
  value: FilterValue;
}
