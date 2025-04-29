import { Box, Checkbox, Container, Typography } from '@mui/material';
import { FilterOption } from '@my-monorepo/ui-kit';

export const FilterCheckbox = ({
  options = [],
  selectedCheckboxes = [],
  onSelect,
}: {
  options: FilterOption[];
  selectedCheckboxes: string[];
  onSelect: (selectedStatuses: string[]) => void;
}) => {
  const handleItemSelect = (status: string) => {
    if (selectedCheckboxes.includes(status)) {
      const filteredStatuses = selectedCheckboxes.filter((it) => it !== status);
      onSelect(filteredStatuses);
    } else {
      onSelect([...selectedCheckboxes, status]);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {options.map((option) => (
        <Box
          key={option.title}
          onClick={() => handleItemSelect(option.value)}
          sx={{
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            '&:hover': {
              cursor: 'pointer',
              background: '#F8F9FA',
            },
          }}
        >
          <Checkbox checked={selectedCheckboxes.includes(option.value)} />
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '20px',
              letterSpacing: '.4%',
              color: '#111727',
            }}
          >
            {option.title}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};
