import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useDebounce } from '@my-monorepo/shared';
import { useEffect, useState } from 'react';

const Search = ({
  value,
  onChange,
  debounceDelay = 500,
  width = '400px',
}: {
  value: string;
  onChange: (newValue: string) => void;
  debounceDelay?: number;
  width?: string;
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce({
    value: inputValue,
    delay: debounceDelay,
  });

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <TextField
      placeholder="Search"
      value={inputValue}
      onChange={handleInput}
      InputProps={{
        sx: { width },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#8E93A8', height: 20, width: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
