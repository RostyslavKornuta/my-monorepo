import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Button, Container } from '@mui/material';
import {
  ActionBar,
  ContentHeader,
  FilterResult,
  Filters,
  Search,
} from '@my-monorepo/ui-kit';
import { useMemo, useState } from 'react';
import CustomTable from '../../../../../libs/ui-kit/src/lib/components/table/table-container';
import {
  contentFiltersConfig,
  contentTableConfig,
} from '../../configs/sites-configs';
import { useGetAuthorsQuery } from '../../services/authorApi';
import { useGetCategoriesQuery } from '../../services/categoryApi';
import { useGetContentsQuery } from '../../services/contentApi';

export const Sites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterResult[]>([]);
  const {
    data: contents = [],
    isLoading: contentsLoading,
    error: contentsError,
  } = useGetContentsQuery();
  const { data: authors } = useGetAuthorsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const mappedArticles = useMemo(
    () =>
      contents.map((content) => {
        const author = authors?.find(
          (it) => it.id === content.article.author
        )?.name;

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
          date: content.article.modifiedAt,
        });
      }),
    [contents]
  );

  const filteredArticles = useMemo(() => {
    let filteredData = mappedArticles;

    if (searchQuery) {
      filteredData = filteredData.filter(
        (it) =>
          it.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilters.length) {
      filteredData = filteredData.filter((it) =>
        selectedFilters.every((filter) =>
          filter.value.includes(it[filter.code].toLowerCase())
        )
      );
    }

    return filteredData;
  }, [searchQuery, selectedFilters, mappedArticles]);

  return (
    <>
      <ContentHeader title="Content">
        <Button
          variant="text"
          color="secondary"
          startIcon={<SettingsOutlinedIcon sx={{ color: '#8E93A8' }} />}
        >
          Settings
        </Button>
      </ContentHeader>
      <ActionBar>
        <Container
          sx={{
            padding: '24px 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Search value={searchQuery} onChange={setSearchQuery} />
          <Filters
            config={contentFiltersConfig({ categories, authors })}
            filterResults={selectedFilters}
            onChange={setSelectedFilters}
          />
        </Container>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <AddIcon sx={{ color: '#FFFFFF', height: 20, width: 20 }} />
          }
        >
          Add content
        </Button>
      </ActionBar>
      <CustomTable
        config={contentTableConfig({ categories })}
        data={filteredArticles}
        isLoading={contentsLoading}
        error={contentsError}
        loaderIcon="/public/loader.svg"
      />
    </>
  );
};
