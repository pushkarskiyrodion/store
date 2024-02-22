import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import './Menu.scss';

import { useScreen } from 'app/hooks/useScreen';
import { Links } from 'components/Links';
import { MenuMobile } from './MenuMobile/MenuMobile';

const items = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Phones',
    path: 'phones',
  },
  {
    title: 'Tablets',
    path: 'tablets',
  },
  {
    title: 'Accessories',
    path: 'accessories',
  },
];

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation().pathname.replace('/', '');
  const id = uniqueId();
  const screenWidth = useScreen();

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
  }, [containerRef]);

  const toggle = () => {
    setIsOpen(current => !current);
  };

  const handleClick = (e: React.MouseEvent, path: string) => {
    if (path === pathname) {
      e.preventDefault();

      return;
    }

    toggle();

    return null;
  };

  const menuItems = items.map(({ title, path }) => (
    <li key={path} className="menu__item">
      <NavLink
        className={({ isActive }) => classNames('menu__link', {
          'menu__link--active': isActive,
        })}
        to={path}
        onClick={(e) => handleClick(e, path)}
      >
        {title}
      </NavLink>
    </li>
  ));

  return (
    <nav className="menu" ref={containerRef}>
      {screenWidth < 1100 ? (
        <MenuMobile
          isOpen={isOpen}
          toggle={toggle}
          element={
            [...menuItems,
              <Links
                key={id}
                linkClassName="menu__link"
                containerClassName="menu__mobile__list"
                toggle={toggle}
              />]
          }
        />
      ) : (
        <ul className="menu__list">
          {menuItems}
        </ul>
      )}
    </nav>
  );
};
