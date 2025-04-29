export interface TableColumn<T> {
  label: string;
  key: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
}
