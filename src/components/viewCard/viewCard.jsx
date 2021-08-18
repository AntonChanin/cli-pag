import React from 'react';
import './viewCard.css';

export const ViewCard = (props) => {
  return (
    <div className="view-card-shadow">
      {props?.children}
    </div>
  );
};