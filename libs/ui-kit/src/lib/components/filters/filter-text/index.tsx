import { Box, TextField } from '@mui/material';

export const FilterText = ({ selectedValue, onChange }: {
  selectedValue: string,
  onChange: (value: string) => void
}) => {
  return (
    <Box sx={{ padding: '8px 14px' }}><TextField placeholder="Enter value" value={selectedValue}
                                                 onChange={(e) => onChange(e.target.value)} /></Box>
  );
};
