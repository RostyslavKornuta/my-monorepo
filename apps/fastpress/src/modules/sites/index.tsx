import { Box, Button, Container, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useGetContentsQuery } from '../../services/contentApi';
import { useGetAuthorsQuery } from '../../services/authorApi';
import {
  ActionBar,
  ContentHeader,
  CustomTable, Filter,
  FilterResult,
  Filters,
  FilterType,
  Image,
  Search, toFilterOption
} from '@my-monorepo/ui-kit';
import { useGetCategoriesQuery } from '../../services/categoryApi';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Category, contentStatuses, contentTypes, formatTimestamp } from '@my-monorepo/shared';
import { NavLink } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { filters } from '../../configs/sites-configs';

export const Sites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterResult[]>([]);
  const { data: contents = [], isLoading: contentsLoading, error: contentsError } = useGetContentsQuery();
  const { data: authors } = useGetAuthorsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const config = useMemo(() => {
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
                  background: !row.favoriteImage ? '#E7E8EC' : undefined
                }}
              >
                {row.favoriteImage && (
                  <Image path={`https://fastpress.prezna.com/api/images/${row.favoriteImage}`} />
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
                    color: '#FFFFFF'
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
                  whiteSpace: 'nowrap'
                }}
              >
                {value}
              </Typography>
            </Container>
          )
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
                  boxShadow: '0 0 0 1px #8CC1AA'
                },
                '&.PENDING': {
                  background: '#E59B20',
                  boxShadow: '0 0 0 1px #EDEEF0'
                }
              }}
            />
          )
        },
        {
          label: 'Trending',
          key: 'trending',
          render: (value) => (value ? 'Yes' : 'No')
        },
        {
          label: 'Type',
          key: 'type',
          render: (value) => (value ? value.charAt(0) + value.slice(1).toLowerCase() : '')
        },
        {
          label: 'Author',
          key: 'author',
          render: (value) => value
        },
        {
          label: 'Category',
          key: 'category',
          render: (value) => <Select value={value}>
            {categories?.map((category: Category) => <MenuItem value={category.id}
                                                               key={category.id}>{category.name}</MenuItem>)}
          </Select>
        },
        {
          label: 'Date',
          key: 'date',
          render: (value) => formatTimestamp(value)
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
                  '&:hover': { backgroundColor: '#E7E8EC' }
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
                  '&:hover': { backgroundColor: '#E7E8EC' }
                }}
                component={NavLink}
              >
                <KeyboardArrowRightIcon sx={{ color: '#8E93A8', height: 20, width: 20 }} />
              </Box>
            </Container>
          )
        }
      ]
    };
  }, [contents, categories]);

  const filters: Filter[] = useMemo(() => [
    {
      title: 'Statuses',
      code: 'STATUS',
      type: 'CHECKBOX',
      options: contentStatuses.map(type => toFilterOption(type.capitalize(), type.toLowerCase()))
    },
    {
      title: 'Authors',
      code: 'AUTHOR',
      type: 'CHECKBOX',
      options: authors?.map(author => toFilterOption(author.name, author.name))
    },
    {
      title: 'Categories',
      code: 'CATEGORY',
      type: 'CHECKBOX',
      options: categories?.map(category => toFilterOption(category.name, category.id))
    },
    {
      title: 'Types',
      code: 'TYPE',
      type: 'CHECKBOX',
      options: contentTypes.map(type => toFilterOption(type.capitalize(), type.toLowerCase()))
    }
  ], [authors, categories]);

  const mappedArticles = useMemo(() => contents.map(content => {
    const author = authors?.find(it => it.id === content.article.author)?.name;

    return Object.assign({
      id: content.article.id,
      path: content.article.path,
      title: content.article.title,
      favoriteImage: content.article.favoriteImage,
      slides: content.details.slides,
      status: content.article.status,
      trending: content.article.trending,
      type: content.article.type,
      author,
      category: content.article.category || '',
      date: content.article.modifiedAt
    });
  }), [contents]);

  const filteredArticles = useMemo(() => {
    let filteredData = mappedArticles;

    if (searchQuery) {
      filteredData = filteredData.filter(it =>
        it.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        it.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilters.length) {
      filteredData = filteredData.filter(it => selectedFilters.every(filter => filter.value.includes(it[filter.code].toLowerCase())));
    }

    return filteredData;
  }, [searchQuery, selectedFilters, mappedArticles]);

  return (
    <>
      <ContentHeader title="Content">
        <Button variant="text" color="secondary"
                startIcon={<SettingsOutlinedIcon sx={{ color: '#8E93A8' }} />}>Settings</Button>
      </ContentHeader>
      <ActionBar>
        <Container sx={{
          padding: '24px 0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <Search value={searchQuery} onChange={setSearchQuery} />
          <Filters config={filters} filterResults={selectedFilters} onChange={setSelectedFilters} />
        </Container>
        <Button variant="contained" color="primary"
                startIcon={<AddIcon sx={{ color: '#FFFFFF', height: 20, width: 20 }} />}>Add content</Button>
      </ActionBar>
      <CustomTable config={config} data={filteredArticles} isLoading={contentsLoading}
                   error={contentsError}
                   loaderIcon="/public/loader.svg" />
    </>
  );
};
