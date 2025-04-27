import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Checkbox, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export type FilterType = 'STATUS' | 'TAG' | 'NUMBER' | 'STRING'

export interface Filter {
  title: string;
  type: FilterType;
  options: Array<string | number>;
}

export interface Test {
  code: string;
  values: Array<string>;
}

export const Filters = ({ config = [], selectedFilters1, onChange }: {
  config: Array<Filter>,
  selectedFilters1: Array<Test>,
  onChange: (filters: any) => void
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Array<Test>>(selectedFilters1);

  const onCancel = () => {
    setIsOpened(false);
  };

  const onApply = () => {
    onChange(selectedFilters);
    setIsOpened(false);
  };

  const handleSelectedItem = (updatedFilter: Test) => {
    setSelectedFilters(prevFilters => {
      const index = prevFilters.findIndex(item => item.code === updatedFilter.code);
      if (index !== -1) {
        const updated = [...prevFilters];
        updated[index] = updatedFilter;
        return updated;
      } else {
        return [...prevFilters, updatedFilter];
      }
    });
  };

  return (
    <Container sx={{
      position: 'relative'
    }}>
      <Button variant="contained" color="secondary"
              startIcon={<FilterListIcon sx={{ color: '#8E93A8', height: 24, width: 24 }} />}
              onClick={() => setIsOpened(!isOpened)}>Filters</Button>

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
            const selectedFilter = selectedFilters.find(f => f.code === filter.title.toLowerCase());
            const selectedValues = selectedFilter ? selectedFilter.values : [];

            return (
              <FilterItem
                key={filter.title}
                filter={filter}
                onSelect={handleSelectedItem}
                selectedValues={selectedValues}
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
              {selectedFilters.filter(filter => filter.values.length > 0).length}
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

const FilterItem = ({ filter, onSelect, selectedValues }: {
  filter: Filter,
  onSelect: (test: Test) => void,
  selectedValues: Test['values']
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedFilterValues, setSelectedFilterValues] = useState<Test>({
    code: filter.title.toLowerCase(),
    values: selectedValues
  });

  const handleItemSelect = (values: Array<string>) => {
    setSelectedFilterValues(prevState => ({ code: prevState.code, values }));
  };

  const renderFilterComponent = () => {
    switch (filter.type) {
      case 'TAG':
        return <FilterItemTag options={filter.options} selectedTags={selectedFilterValues.values}
                              onSelect={handleItemSelect} />;
      case 'STATUS':
        return <FilterItemCheckbox options={filter.options} selectedStatuses={selectedFilterValues.values}
                                   onSelect={handleItemSelect} />;
      case 'NUMBER':
        return <FilterItemNumber selectedValue={selectedFilterValues.values} onChange={handleItemSelect} />;
      case 'STRING':
        return <FilterItemString selectedValue={selectedFilterValues.values} onChange={handleItemSelect} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    onSelect(selectedFilterValues);
  }, [selectedFilterValues]);

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
        {selectedFilterValues.values.length !== 0 && <Typography sx={{
          padding: '4px 8px',
          background: '#F1F2F4',
          borderRadius: '4px',
          fontSize: '12px',
          lineHeight: '16px',
          color: '#8E93A8'
        }}>+{selectedFilterValues.values.length}</Typography>}
      </Box>
      {isOpened && renderFilterComponent()}
    </>
  );
};

export const FilterItemTag = ({ options = [], selectedTags = [], onSelect }: {
  options: Array<string>,
  selectedTags: Array<string>,
  onSelect: (selectedTags: Array<string>) => void
}) => {
  const handleItemSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      const filteredTags = selectedTags.filter(it => it !== tag);
      onSelect(filteredTags);
    } else {
      onSelect([...selectedTags, tag]);
    }
  };

  return (
    <Container sx={{
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      {options.map(tag => (
        <Box
          key={tag}
          onClick={() => handleItemSelect(tag)}
          sx={{
            width: '10px',
            height: '10px',
            padding: '5px',
            background: tag,
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

export const FilterItemCheckbox = ({ options = [], selectedStatuses = [], onSelect }: {
  options: Array<string>,
  selectedStatuses: Array<string>,
  onSelect: (selectedStatuses: Array<string>) => void
}) => {
  const handleItemSelect = (status: string) => {
    if (selectedStatuses.includes(status)) {
      const filteredStatuses = selectedStatuses.filter(it => it !== status);
      onSelect(filteredStatuses);
    } else {
      onSelect([...selectedStatuses, status]);
    }
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {options.map(status => (
        <Box key={status} onClick={() => handleItemSelect(status)} sx={{
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          '&:hover': {
            cursor: 'pointer',
            background: '#F8F9FA'
          }
        }}>
          <Checkbox checked={selectedStatuses.includes(status)} />
          <Typography sx={{
            fontSize: '12px',
            lineHeight: '20px',
            letterSpacing: '.4%',
            color: '#111727'
          }}>{status}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export const FilterItemNumber = ({ selectedValue, onChange }: {
  selectedValue: any,
  onChange: (test: any) => void
}) => {
  const [selectedType, setSelectedType] = useState(selectedValue[0]?.code || 'GREATER_THAN');
  const [value, setValue] = useState(selectedValue[0]?.values[0] || '');

  useEffect(() => {
    onChange([{ code: selectedType, values: [value] }]);
  }, [value, selectedType]);

  return (
    <Container sx={{ padding: '8px 14px' }}>
      <Select value={selectedType} onChange={event => setSelectedType(event.target.value)}>
        <MenuItem value="GREATER_THAN">Greater Than</MenuItem>
        <MenuItem value="LESS_THAN">Less Than</MenuItem>
        <MenuItem value="CONTAINS">Contains</MenuItem>
      </Select>
      <Box sx={{ paddingTop: '10px' }}>
        <TextField
          type="number"
          placeholder="Enter value"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </Box>
    </Container>
  );
};

export const FilterItemString = ({ selectedValue, onChange }: {
  selectedValue: string,
  onChange: (value: string) => void
}) => {
  const [value, setValue] = useState(selectedValue || '');

  useEffect(() => {
    onChange([value]);
  }, [value]);

  return (
    <Box sx={{ padding: '8px 14px' }}><TextField placeholder="Enter value" value={value}
                                                 onChange={(e) => setValue(e.target.value)} /></Box>
  );
};
