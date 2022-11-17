import React, { ReactNode } from 'react';

import './card.scss';
import { StringOrUndefined } from '../../../types/string-undefined';

const Card = ({children, className = ''}: {children: ReactNode, className?: StringOrUndefined}) => {
  const classes = `card ${className}`;
  return (
    <div className={classes}>{children}</div>
  );
};

export default Card;