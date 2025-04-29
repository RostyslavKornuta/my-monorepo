import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import {
  Filter,
  FilterItem,
  FilterResult,
  FilterValue,
} from '@my-monorepo/ui-kit';

const Filters = ({
  config = [],
  filterResults,
  onChange,
}: {
  config: Filter[];
  filterResults: FilterResult[];
  onChange: (filterResults: FilterResult[]) => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedFilters, setSelectedFilters] =
    useState<FilterResult[]>(filterResults);

  const onClearAll = () => {
    onChange([]);
    setSelectedFilters([]);
    setIsOpened(false);
  };

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
    setSelectedFilters((prevFilters) => {
      const index = prevFilters.findIndex(
        (item) => item.code === filterResult.code
      );

      if (isEmptyValue(filterResult.value)) {
        return prevFilters.filter((item) => item.code !== filterResult.code);
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
    <Container
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        startIcon={
          <FilterListIcon sx={{ color: '#8E93A8', height: 24, width: 24 }} />
        }
        onClick={() => setIsOpened(!isOpened)}
      >
        Filters
      </Button>
      {filterResults.length > 0 && (
        <Button variant="text" color="primary" onClick={() => onClearAll()}>
          Clear All
        </Button>
      )}
      {isOpened && (
        <Container
          sx={{
            width: '400px',
            maxHeight: '485px',
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFFFF',
            boxShadow: '0px 12px 24px 0px #8E93A84D',
            borderRadius: '16px',
          }}
        >
          <Container
            sx={{
              padding: '16px',
              borderBottom: '1px solid #F1F2F4',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '100%',
                letterSpacing: '.5%',
                color: '#171F33',
              }}
            >
              Filters
            </Typography>
          </Container>
          <Container
            sx={{
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {config.map((filter) => {
              const filterResult = selectedFilters.find(
                (it) => it.code === filter.code.toLowerCase()
              );
              const filterResultValues = filterResult
                ? filterResult.value
                : undefined;

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
          <Container
            sx={{
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #F1F2F4',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#8E93A8',
              }}
            >
              Selected items:
              <Typography component="span" sx={{ fontWeight: 500 }}>
                {selectedFilters.length}
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <Button variant="contained" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={onApply}>
                Apply
              </Button>
            </Box>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default Filters;
