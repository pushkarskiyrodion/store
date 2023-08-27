type Props = {
  containerClassName: string,
  linkClassName: string,
  toggle?: () => void,
};

const links = [
  {
    id: 1,
    title: 'GitHub',
    href: 'https://github.com/pushkarskiyrodion/react_phone-catalog',
  },
  {
    id: 2,
    title: 'Contacts',
    href: 'mailto:pushkarskiyrodion@gmail.com',
  },
  {
    id: 3,
    title: 'Rights',
    href: 'https://github.com/pushkarskiyrodion/react_phone-catalog',
  },
];

export const Links: React.FC<Props> = ({
  containerClassName,
  linkClassName,
  toggle = () => {},
}) => (
  <nav className={containerClassName}>
    {links.map(({ id, title, href }) => (
      <a
        rel="noopener noreferrer"
        className={linkClassName}
        href={href}
        key={id}
        onClick={toggle}
        target="_blank"
      >
        {title}
      </a>
    ))}
  </nav>
);
