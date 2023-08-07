import React, { useEffect } from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  pages: number,
  selectedPage: number,
  onSelectPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = React.memo(({
  pages,
  selectedPage,
  onSelectPage,
}) => {
  const handleClickPage = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onSelectPage(page);
  };

  const handleNext = () => {
    if (selectedPage + 1 <= pages) {
      onSelectPage(selectedPage + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPage - 1 >= 1) {
      onSelectPage(selectedPage - 1);
    }
  };

  useEffect(() => {
    if (selectedPage > pages) {
      onSelectPage(pages);
    }
  }, [pages, selectedPage]);

  const renderPageLink = (page: number) => (
    <li
      className={classNames('pagination__item', {
        'pagination__item--active': selectedPage === page,
      })}
      key={page}
    >
      <a
        href="/"
        className="pagination__link"
        onClick={(e) => handleClickPage(e, page)}
      >
        {page}
      </a>
    </li>
  );

  const displayPages = 2;
  const gap = '_';
  const pageLinks = [];

  if (pages > 1) {
    pageLinks.push(renderPageLink(1));
  }

  if (selectedPage - displayPages > 2) {
    pageLinks.push(gap);
  }

  for (
    let i = selectedPage - displayPages;
    i <= selectedPage + displayPages;
    i += 1
  ) {
    if (i > 1 && i < pages) {
      pageLinks.push(renderPageLink(i));
    }
  }

  if (selectedPage + displayPages < pages - 1) {
    pageLinks.push(gap);
  }

  if (pages > 1) {
    pageLinks.push(renderPageLink(pages));
  }

  return (
    <>
      {pages > 1 && (
        <div className="pagination">
          <button
            className={classNames(
              'pagination__button pagination__button--prev',
              {
                'pagination__button--disabled': selectedPage === 1,
              },
            )}
            type="button"
            onClick={handlePrev}
            aria-label="none"
            disabled={selectedPage === 1}
          />

          <ul className="pagination__list">
            {pageLinks}
          </ul>

          <button
            className={classNames('pagination__button', {
              'pagination__button--disabled': selectedPage === pages,
            })}
            type="button"
            onClick={handleNext}
            aria-label="none"
            disabled={selectedPage === pages}
          />
        </div>
      )}
    </>
  );
});
