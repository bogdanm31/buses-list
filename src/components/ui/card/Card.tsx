import React, { ReactNode } from 'react';

import './card.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card = ({
  children,
  className
}: Props) => {
  const classes = `card ${className}`;
  return (
    <div className={classes}>{children}</div>
  );
};

export default Card;