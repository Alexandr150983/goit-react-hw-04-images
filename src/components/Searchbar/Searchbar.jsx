import React, { useState } from 'react';
import {
  StyledSearchbar,
  StyledForm,
  StyledButton,
  StyledButtonLabel,
  StyledInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <StyledSearchbar>
      <StyledForm onSubmit={handleSubmit}>
        <StyledButton type="submit">
          <StyledButtonLabel>Search</StyledButtonLabel>
        </StyledButton>
        <StyledInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </StyledForm>
    </StyledSearchbar>
  );
};
