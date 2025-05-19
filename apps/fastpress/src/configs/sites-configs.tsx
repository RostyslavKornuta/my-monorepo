import { Box, Container, MenuItem, Select, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Author,
  capitalize,
  Category,
  contentStatuses,
  contentTypes,
  formatTimestamp,
} from '@my-monorepo/shared';
import { Filter, Image, toFilterOption } from '@my-monorepo/ui-kit';
import { NavLink } from 'react-router-dom';

export const contentTableConfig = (additional?: any) => {
  return {
    columns: [
      {
        label: 'Title',
        key: 'title',
        render: (value, row) => (
          <Container sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box
              sx={{
                position: 'relative',
                width: '40px',
                height: '40px',
                border: '1px solid #CBCEDA',
                borderRadius: '8px',
                background: !row.favoriteImage ? '#E7E8EC' : undefined,
              }}
            >
              {row.favoriteImage && (
                <Image
                  path={`https://fastpress.prezna.com/api/images/${row.favoriteImage}`}
                />
              )}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#171F33',
                  borderTopRightRadius: '6px',
                  borderBottomLeftRadius: '7px',
                  color: '#FFFFFF',
                }}
              >
                {row.slides?.length || 1}
              </Box>
            </Box>
            <Typography
              sx={{
                maxWidth: '300px',
                fontSize: '12px',
                lineHeight: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {value}
            </Typography>
          </Container>
        ),
      },
      {
        label: 'Status',
        key: 'status',
        render: (value) => (
          <Box
            className={value}
            sx={{
              width: '8px',
              height: '8px',
              padding: '4px',
              background: '#8E93A8',
              border: '4px solid #FFFFFF',
              borderRadius: '100%',
              boxShadow: '0 0 0 1px #8E93A8',
              '&.ACTIVE': {
                background: '#6FB295',
                boxShadow: '0 0 0 1px #8CC1AA',
              },
              '&.PENDING': {
                background: '#E59B20',
                boxShadow: '0 0 0 1px #E59B20',
              },
            }}
          />
        ),
      },
      {
        label: 'Trending',
        key: 'trending',
        render: (value) => (value ? 'Yes' : 'No'),
      },
      {
        label: 'Type',
        key: 'type',
        render: (value) =>
          value ? value.charAt(0) + value.slice(1).toLowerCase() : '',
      },
      {
        label: 'Author',
        key: 'author',
        render: (value) => value,
      },
      {
        label: 'Category',
        key: 'category',
        render: (value) => (
          <Select value={value}>
            {additional?.categories?.map((category: Category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        ),
      },
      {
        label: 'Date',
        key: 'date',
        render: (value) => formatTimestamp(value),
      },
      {
        label: 'Action',
        key: 'action',
        render: (_, row) => (
          <Container sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box
              sx={{
                padding: '6px',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#E7E8EC' },
              }}
              component={NavLink}
              to={row.path}
            >
              <OpenInNewIcon sx={{ color: '#8E93A8', height: 20, width: 20 }} />
            </Box>
            <Box
              sx={{
                padding: '6px',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#E7E8EC' },
              }}
              component={NavLink}
            >
              <KeyboardArrowRightIcon
                sx={{ color: '#8E93A8', height: 20, width: 20 }}
              />
            </Box>
          </Container>
        ),
      },
    ],
  };
};

export const contentFiltersConfig = (additional?: any): Filter[] => [
  {
    title: 'Status',
    code: 'STATUS',
    type: 'CHECKBOX',
    options: contentStatuses.map((type) =>
      toFilterOption(capitalize(type), type.toLowerCase())
    ),
  },
  {
    title: 'Authors',
    code: 'AUTHOR',
    type: 'CHECKBOX',
    options: additional?.authors?.map((author: Author) =>
      toFilterOption(author.name, author.name)
    ),
  },
  {
    title: 'Categories',
    code: 'CATEGORY',
    type: 'CHECKBOX',
    options: additional?.categories?.map((category: Category) =>
      toFilterOption(category.name, category.id)
    ),
  },
  {
    title: 'Types',
    code: 'TYPE',
    type: 'CHECKBOX',
    options: contentTypes.map((type) =>
      toFilterOption(capitalize(type), type.toLowerCase())
    ),
  },
];
