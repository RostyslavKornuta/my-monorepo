import { Box, Container } from '@mui/material';
import { FilterOption } from '@my-monorepo/ui-kit';

export const FilterColor = ({
  options = [],
  selectedColors = [],
  onSelect,
}: {
  options: FilterOption[];
  selectedColors: string[];
  onSelect: (selectedTags: string[]) => void;
}) => {
  const handleItemSelect = (tag: string) => {
    if (selectedColors.includes(tag)) {
      const filteredTags = selectedColors.filter((it) => it !== tag);
      onSelect(filteredTags);
    } else {
      onSelect([...selectedColors, tag]);
    }
  };

  return (
    <Container
      sx={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {options.map((option) => (
        <Box
          key={option.title}
          onClick={() => handleItemSelect(option.value)}
          sx={{
            width: '10px',
            height: '10px',
            padding: '5px',
            background: option.value,
            border: '3px solid #FFFFFF',
            borderRadius: '100%',
            boxShadow: '0 0 0 1px #8E93A8',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      ))}
    </Container>
  );
};
