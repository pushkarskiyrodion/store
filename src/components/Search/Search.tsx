import { useLocation, useSearchParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import './Search.scss';

import { getSearchWith } from 'helpers/getSearchWith';
import { QueryParams } from 'types/QueryParams';
import { debounce } from 'helpers/debounce';

const paths = ['phones', 'tablets', 'accessories'];

export const Search = () => {
  const [query, setQuery] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation().pathname.replace('/', '');
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchWith = (params: QueryParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const debouncedQuery = debounce(setSearchWith, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedQuery({ query: e.target.value || null });
  };

  const handleDelete = () => {
    setQuery('');
    setSearchWith({ query: null });
  };

  const handleClickSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {paths.includes(location) && (
        <div className="search">
          <input
            ref={inputRef}
            type="text"
            value={query}
            className="search__input"
            onChange={handleChange}
            placeholder={`Search in ${location}`}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />

          {query ? (
            <button
              className={classNames('search__icon search__icon--delete', {
                'search__icon--focused': isFocus,
              })}
              type="button"
              aria-label="none"
              onClick={handleDelete}
            />
          ) : (
            <button
              type="button"
              aria-label="none"
              onClick={handleClickSearch}
              className={classNames('search__icon search__icon--search', {
                'search__icon--focused': isFocus,
              })}
            />
          )}
        </div>
      )}
    </>
  );
};
