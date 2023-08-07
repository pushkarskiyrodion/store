import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="back-button">
      <div className="back-button__arrow" />

      <button
        type="button"
        className="back-button__back"
        onClick={handleBack}
      >
        Back
      </button>

    </div>
  );
};
