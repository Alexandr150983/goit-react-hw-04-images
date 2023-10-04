import React, { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppContainer } from 'App.styled';
import { Button } from 'components/Button/Button';
import { CustomLoader } from 'components/Loader/Loader';
import { getImages } from 'components/servise/ApiService';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (page === 1 && query === '') return;

    setIsLoading(true);

    getImages(query, page)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const loadMoreImages = () => {
    setPage(page => page + 1);
  };

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const scrollToLoad = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <AppContainer>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} />
      {!isLoading && images.length > 0 && images.length < totalHits && (
        <Button onClick={loadMoreImages} />
      )}
      {isLoading && images.length > 0 && scrollToLoad()}
      {isLoading ? <CustomLoader /> : null}
      {error && <p>Error: {error.message}</p>}
    </AppContainer>
  );
};
