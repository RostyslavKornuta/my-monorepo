import { render, screen, fireEvent } from '@testing-library/react';
import Search from './index';
import '@testing-library/jest-dom';

jest.mock('@my-monorepo/shared', () => ({
  ...jest.requireActual('@my-monorepo/shared'),
  useDebounce: ({ value }: { value: string }) => value,
}));

describe('Search component', () => {
  it('Renders input with placeholder', () => {
    render(<Search value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  it('Displays initial value', () => {
    render(<Search value="initial" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('Updates input value and calls onChange immediately (mocked debounce)', () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('Respects custom width style', () => {
    render(<Search value="" onChange={jest.fn()} width="500px" />);
    const input = screen.getByPlaceholderText('Search');

    const wrapper = input.closest('.MuiInputBase-root');
    expect(wrapper).toHaveStyle('width: 500px');
  });
});
