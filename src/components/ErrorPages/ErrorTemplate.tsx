import './ErrorPages.scss';

type Props = {
  title: string,
  src: string,
  alt: string,
};

export const ErrorTemplate: React.FC<Props> = ({ title, src, alt }) => (
  <div className="error-page">
    <h4 className="error-page__title">
      {title}
    </h4>

    <div className="error-page__image__container">
      <img
        className="error-page__image"
        src={src}
        alt={alt}
      />
    </div>
  </div>
);
