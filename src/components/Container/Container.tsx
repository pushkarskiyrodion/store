import React from 'react';

import './Container.scss';

type Props = {
  children: React.ReactNode,
};

export const Container: React.FC<Props> = ({ children }) => (
  <div className="container">
    {children}
  </div>
);
