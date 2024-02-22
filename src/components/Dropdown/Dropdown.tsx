import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

import { Pagination } from 'enums/Pagination';
import { Sort } from 'enums/Sort';

type Props = {
  initialValue: string,
  dropdownList: typeof Sort | typeof Pagination,
  title: string,
  onSelectHandler: (value: string) => void,
};

export const Dropdown: React.FC<Props> = React.memo(({
  initialValue,
  dropdownList,
  title,
  onSelectHandler,
}) => {
  const [selected, setSelected] = useState(initialValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(current => !current);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const { current } = containerRef;

      if (current && !current.contains(e.target as Document)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [containerRef.current]);

  const handleSelect = (
    e: React.MouseEvent,
    key: string,
    value: string,
  ) => {
    e.preventDefault();

    if (Number(value)) {
      onSelectHandler(value);
      setSelected(value);
    } else {
      onSelectHandler(value);
      setSelected(key);
    }

    toggle();
  };

  return (
    <div className="dropdown">
      <div className="dropdown__title">
        {title}
      </div>

      <div
        ref={containerRef}
        className="dropdown__wrapper"
      >
        <div
          className={classNames('dropdown__value__wrapper', {
            'dropdown__value__wrapper--active': isOpen,
          })}
        >
          <button
            type="button"
            className={classNames('dropdown__value', {
              'dropdown__value--opened': isOpen,
            })}
            onClick={toggle}
          >
            {selected[0].toUpperCase() + selected.slice(1)}
          </button>
        </div>

        {isOpen && (
          <ul className="dropdown__list">
            {Object.entries(dropdownList).map(([key, value]) => {
              const visibleValue = Number(value) ? value : key;

              if (selected === value || selected === key) {
                return;
              }

              return (
                <li key={key} className="dropdown__item">
                  <a
                    href="/"
                    className="dropdown__link"
                    onClick={(e) => handleSelect(e, key, value)}
                  >
                    {visibleValue}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
});
