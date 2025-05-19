import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './filter-group/index';
import { Filter, FilterResult } from '@my-monorepo/ui-kit';
import '@testing-library/jest-dom';

const filtersConfig: Filter[] = [
  {
    title: 'Color',
    code: 'color',
    type: 'COLOR',
    options: [
      { title: 'Red', value: 'red' },
      { title: 'Blue', value: 'blue' },
    ],
  },
  {
    title: 'Status',
    code: 'status',
    type: 'CHECKBOX',
    options: [
      { title: 'Active', value: 'active' },
      { title: 'Inactive', value: 'inactive' },
    ],
  },
];

describe('Filters component', () => {
  it('Toggles filter panel open/close', () => {
    render(
      <Filters config={filtersConfig} filterResults={[]} onChange={() => {}} />
    );
    const filterButton = screen.getByRole('button', { name: /filters/i });
    expect(screen.queryByText(/selected items/i)).not.toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.getByText(/selected items/i)).toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.queryByText(/selected items/i)).not.toBeInTheDocument();
  });

  it('Renders Clear All button if there are filter results', () => {
    const initialResults: FilterResult[] = [
      { code: 'color', type: 'COLOR', value: ['red'] },
    ];
    render(
      <Filters
        config={filtersConfig}
        filterResults={initialResults}
        onChange={() => {}}
      />
    );
    expect(
      screen.getByRole('button', { name: /clear all/i })
    ).toBeInTheDocument();
  });

  it('Calls onChange with empty array when Clear All clicked', () => {
    const initialResults: FilterResult[] = [
      { code: 'color', type: 'COLOR', value: ['red'] },
    ];
    const onChangeMock = jest.fn();
    render(
      <Filters
        config={filtersConfig}
        filterResults={initialResults}
        onChange={onChangeMock}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
    expect(onChangeMock).toHaveBeenCalledWith([]);
  });

  it('Applies selected filters when Apply button clicked', () => {
    const onChangeMock = jest.fn();
    render(
      <Filters
        config={filtersConfig}
        filterResults={[]}
        onChange={onChangeMock}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /filters/i }));

    fireEvent.click(screen.getByRole('button', { name: /apply/i }));
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Cancels filter changes when Cancel clicked', () => {
    render(
      <Filters config={filtersConfig} filterResults={[]} onChange={() => {}} />
    );
    fireEvent.click(screen.getByRole('button', { name: /filters/i }));
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByText(/selected items/i)).not.toBeInTheDocument();
  });
});
