import { render, screen } from '@testing-library/react';
import CustomTable from './table-container/index';
import { TableConfig, TableColumn } from './types';
import '@testing-library/jest-dom';

type TestData = {
  id: number;
  name: string;
  age: number;
};

const columns: TableColumn<TestData>[] = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  {
    label: 'Age',
    key: 'age',
    render: (value) => <span>{value} years</span>,
  },
];

const data: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

describe('CustomTable', () => {
  const loaderIcon = '/loader.svg';

  it('Shows loader when isLoading=true', () => {
    render(
      <CustomTable
        config={{ columns }}
        data={[]}
        isLoading={true}
        loaderIcon={loaderIcon}
        error={null}
      />
    );
    const loader = screen.getByRole('img');
    expect(loader).toHaveAttribute('src', loaderIcon);
  });

  it('Shows error message when error exists', () => {
    render(
      <CustomTable
        config={{ columns }}
        data={[]}
        isLoading={false}
        loaderIcon={loaderIcon}
        error={'Something went wrong'}
      />
    );
    expect(screen.getByText(/oops, something went wrong/i)).toBeInTheDocument();
  });

  it('Shows no results message when data is empty', () => {
    render(
      <CustomTable
        config={{ columns }}
        data={[]}
        isLoading={false}
        loaderIcon={loaderIcon}
        error={null}
      />
    );
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('Renders table with data', () => {
    render(
      <CustomTable
        config={{ columns }}
        data={data}
        isLoading={false}
        loaderIcon={loaderIcon}
        error={null}
      />
    );

    columns.forEach((col) => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });

    data.forEach((row) => {
      expect(screen.getByText(String(row.id))).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(`${row.age} years`)).toBeInTheDocument();
    });
  });
});
