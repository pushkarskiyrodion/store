import classNames from 'classnames';
import '../Menu.scss';

type Props = {
  element: JSX.Element[],
  isOpen: boolean,
  toggle: () => void,
};

export const MenuMobile: React.FC<Props> = ({ element, isOpen, toggle }) => {
  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={classNames('menu--mobile', {
          'menu--mobile--opened': isOpen,
        })}
      >
        <div className="menu__burger" />
        <div className="menu__burger" />
        <div className="menu__burger" />
      </button>

      {isOpen && (
        <nav className="menu__mobile">
          <ul
            className="menu__mobile__list"
          >
            {element}
          </ul>
        </nav>
      )}
    </>
  );
};
