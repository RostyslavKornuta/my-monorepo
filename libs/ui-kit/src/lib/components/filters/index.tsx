import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Checkbox, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export type FilterType = 'CHECKBOX' | 'COLOR' | 'STRING'

export type FilterValue = string | Array<any>

export interface Filter {
  title: string;
  code: string;
  type: FilterType;
  options: FilterOption[];
}

export interface FilterOption {
  title: string;
  value: string;
}

export const toFilterOption = (title: string, value: string): FilterOption => ({ title, value });

export interface FilterResult {
  code: string;
  type: FilterType;
  value: FilterValue;
}

export const Filters = ({ config = [], filterResults, onChange }: {
  config: Filter[],
  filterResults: FilterResult[],
  onChange: (filterResults: FilterResult[]) => void
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterResult[]>(filterResults);

  const onClearAll = () => {
    onChange([])
    setSelectedFilters([])
    setIsOpened(false);
  }

  const onCancel = () => {
    setIsOpened(false);
  };

  const onApply = () => {
    onChange(selectedFilters);
    setIsOpened(false);
  };

  const isEmptyValue = (value: FilterValue): boolean => {
    if (value === null || value === undefined) return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'string') return value.trim() === '';
    if (typeof value === 'object') return Object.keys(value).length === 0;

    return false;
  };

  const handleSelectedItem = (filterResult: FilterResult) => {
    setSelectedFilters(prevFilters => {
      const index = prevFilters.findIndex(item => item.code === filterResult.code);

      if (isEmptyValue(filterResult.value)) {
        return prevFilters.filter(item => item.code !== filterResult.code);
      }

      if (index !== -1) {
        const updated = [...prevFilters];
        updated[index] = filterResult;
        return updated;
      }

      return [...prevFilters, filterResult];
    });
  };

  return (
    <Container sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <Button variant="contained" color="secondary"
              startIcon={<FilterListIcon sx={{ color: '#8E93A8', height: 24, width: 24 }} />}
              onClick={() => setIsOpened(!isOpened)}>Filters</Button>
      {filterResults.length > 0 && <Button variant="text" color="primary"
                                         onClick={() => onClearAll()}>Clear All</Button>}
      {isOpened && <Container sx={{
        width: '400px',
        maxHeight: '485px',
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        boxShadow: '0px 12px 24px 0px #8E93A84D',
        borderRadius: '16px'
      }}>
        <Container sx={{
          padding: '16px',
          borderBottom: '1px solid #F1F2F4'
        }}>
          <Typography sx={{
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '100%',
            letterSpacing: '.5%',
            color: '#171F33'
          }}>Filters</Typography>
        </Container>
        <Container sx={{
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
          {config.map(filter => {
            const filterResult = selectedFilters.find(it => it.code === filter.code.toLowerCase());
            const filterResultValues = filterResult ? filterResult.value : undefined;

            return (
              <FilterItem
                key={filter.title}
                filter={filter}
                onSelect={handleSelectedItem}
                selectedValue={filterResultValues}
              />
            );
          })}
        </Container>
        <Container sx={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #F1F2F4'
        }}>
          <Typography sx={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#8E93A8'
          }}>
            Selected items:
            <Typography component="span" sx={{ fontWeight: 500 }}>
              {selectedFilters.length}
            </Typography>
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <Button variant="contained" color="secondary"
                    onClick={onCancel}>Cancel</Button>
            <Button variant="contained" color="primary"
                    onClick={onApply}>Apply</Button>
          </Box>
        </Container>
      </Container>}
    </Container>
  );
};

const FilterItem = ({ filter, onSelect, selectedValue }: {
  filter: Filter,
  onSelect: (filterResult: FilterResult) => void,
  selectedValue?: FilterValue
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleItemSelect = (value: FilterValue) => {
    onSelect({ code: filter.code.toLowerCase(), type: filter.type, value });
  };

  const renderFilterComponent = () => {
    switch (filter.type) {
      case 'COLOR': {
        const typedValue = selectedValue as string[];
        return <FilterItemColor options={filter.options} selectedColors={typedValue}
                                onSelect={handleItemSelect} />;
      }
      case 'CHECKBOX': {
        const typedValue = selectedValue as string[];
        return <FilterItemCheckbox options={filter.options} selectedCheckboxes={typedValue}
                                   onSelect={handleItemSelect} />;
      }
      default: {
        const typedValue = selectedValue as string;
        return <FilterItemString selectedValue={typedValue} onChange={handleItemSelect} />;
      }
    }
  };

  return (
    <>
      <Box onClick={() => setIsOpened(!isOpened)} className={isOpened && 'opened'} sx={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        '&:hover, &.opened': {
          cursor: 'pointer',
          background: '#F8F9FA'
        }
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <KeyboardArrowRightIcon sx={{ color: '#8E93A8' }} />
          <Typography sx={{
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '.4%',
            color: '#111727'
          }}>{filter.title}</Typography>
        </Box>
        {selectedValue && selectedValue.length > 0 && <Typography sx={{
          padding: '4px 8px',
          background: '#F1F2F4',
          borderRadius: '4px',
          fontSize: '12px',
          lineHeight: '16px',
          color: '#8E93A8'
        }}>+{selectedValue.length}</Typography>}
      </Box>
      {isOpened && renderFilterComponent()}
    </>
  );
};

export const FilterItemColor = ({ options = [], selectedColors = [], onSelect }: {
  options: FilterOption[],
  selectedColors: string[],
  onSelect: (selectedTags: string[]) => void
}) => {
  const handleItemSelect = (tag: string) => {
    if (selectedColors.includes(tag)) {
      const filteredTags = selectedColors.filter(it => it !== tag);
      onSelect(filteredTags);
    } else {
      onSelect([...selectedColors, tag]);
    }
  };

  return (
    <Container sx={{
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      {options.map(option => (
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
              cursor: 'pointer'
            }
          }}
        />
      ))}
    </Container>
  );
};

export const FilterItemCheckbox = ({ options = [], selectedCheckboxes = [], onSelect }: {
  options: FilterOption[],
  selectedCheckboxes: string[],
  onSelect: (selectedStatuses: string[]) => void
}) => {
  const handleItemSelect = (status: string) => {
    if (selectedCheckboxes.includes(status)) {
      const filteredStatuses = selectedCheckboxes.filter(it => it !== status);
      onSelect(filteredStatuses);
    } else {
      onSelect([...selectedCheckboxes, status]);
    }
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {options.map(option => (
        <Box key={option.title} onClick={() => handleItemSelect(option.value)} sx={{
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          '&:hover': {
            cursor: 'pointer',
            background: '#F8F9FA'
          }
        }}>
          <Checkbox checked={selectedCheckboxes.includes(option.value)} />
          <Typography sx={{
            fontSize: '12px',
            lineHeight: '20px',
            letterSpacing: '.4%',
            color: '#111727'
          }}>{option.title}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export const FilterItemString = ({ selectedValue, onChange }: {
  selectedValue: string,
  onChange: (value: string) => void
}) => {
  return (
    <Box sx={{ padding: '8px 14px' }}><TextField placeholder="Enter value" value={selectedValue}
                                                 onChange={(e) => onChange(e.target.value)} /></Box>
  );
};
