import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useRef } from 'react';

export const CustomSearch = ({ value, onChange }: {
  value: string;
  onChange: (newValue: string) => void;
}) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      onChange(e.target.value);
    }, 500)
  };

  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={handleInput}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#8E93A8', height: 20, width: 20 }} />
          </InputAdornment>
        )
      }}
    />
  );
};
