import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Filter,
  FilterText,
  FilterResult,
  FilterValue,
  FilterColor,
  FilterCheckbox,
} from '@my-monorepo/ui-kit';

const FilterItem = ({
  filter,
  onSelect,
  selectedValue,
}: {
  filter: Filter;
  onSelect: (filterResult: FilterResult) => void;
  selectedValue?: FilterValue;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleItemSelect = (value: FilterValue) => {
    onSelect({ code: filter.code.toLowerCase(), type: filter.type, value });
  };

  const renderFilterComponent = () => {
    switch (filter.type) {
      case 'COLOR': {
        const typedValue = selectedValue as string[];
        return (
          <FilterColor
            options={filter.options}
            selectedColors={typedValue}
            onSelect={handleItemSelect}
          />
        );
      }
      case 'CHECKBOX': {
        const typedValue = selectedValue as string[];
        return (
          <FilterCheckbox
            options={filter.options}
            selectedCheckboxes={typedValue}
            onSelect={handleItemSelect}
          />
        );
      }
      default: {
        const typedValue = selectedValue as string;
        return (
          <FilterText selectedValue={typedValue} onChange={handleItemSelect} />
        );
      }
    }
  };

  return (
    <>
      <Box
        onClick={() => setIsOpened(!isOpened)}
        className={isOpened && 'opened'}
        sx={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          '&:hover, &.opened': {
            cursor: 'pointer',
            background: '#F8F9FA',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <KeyboardArrowRightIcon sx={{ color: '#8E93A8' }} />
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '.4%',
              color: '#111727',
            }}
          >
            {filter.title}
          </Typography>
        </Box>
        {selectedValue && selectedValue.length > 0 && (
          <Typography
            sx={{
              padding: '4px 8px',
              background: '#F1F2F4',
              borderRadius: '4px',
              fontSize: '12px',
              lineHeight: '16px',
              color: '#8E93A8',
            }}
          >
            +{selectedValue.length}
          </Typography>
        )}
      </Box>
      {isOpened && renderFilterComponent()}
    </>
  );
};

export default FilterItem;
