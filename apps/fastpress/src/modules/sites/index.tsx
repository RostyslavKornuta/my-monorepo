import { Button, Container } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useGetContentsQuery } from '../../services/contentApi';
import { useGetAuthorsQuery } from '../../services/authorApi';
import { ActionBar, ContentBar, ContentHeader, CustomSearch, CustomTable } from '@my-monorepo/ui-kit';
import { config, mediumLevel, topLevel } from '../../configs/content-configs';
import { useGetCategoriesQuery } from '../../services/categoryApi';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

export const Sites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: contents, isLoading: contentsLoading, error: contentsError } = useGetContentsQuery();
  const { data: authors } = useGetAuthorsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const mappedArticles = useMemo(() => contents?.map(content => {
    const author = authors?.find(it => it.id === content.article.author).name;

    return Object.assign({
      id: content.article.id,
      path: content.article.path,
      title: content.article.title,
      favoriteImage: content.article.favoriteImage,
      slides: content.details.elements,
      status: content.article.status,
      trending: content.article.trending,
      type: content.article.type,
      author,
      category: content.article.category,
      date: content.article.modifiedAt
    });
  }), [contents]);

  useEffect(() => {
    return () => {
      console.log(searchQuery);
    };
  }, [searchQuery]);

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
          <CustomSearch value={searchQuery} onChange={setSearchQuery} />
          <Button variant="contained" color="secondary"
                  startIcon={<FilterListIcon sx={{ color: '#8E93A8', height: 24, width: 24 }} />}>Filters</Button>
        </Container>
        <Button variant="contained" color="primary"
                startIcon={<AddIcon sx={{ color: '#FFFFFF', height: 20, width: 20 }} />}>Add content</Button>
      </ActionBar>
      <CustomTable config={config({ categories })} isLoading={contentsLoading} error={contentsError}
                   loaderIcon="/public/loader.svg" data={mappedArticles} />
    </>
  );
};
