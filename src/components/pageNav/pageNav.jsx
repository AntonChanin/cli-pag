import React from 'react';
import './pageNav.css';

export const PageNav = (props) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="page-nav">
      {pages.map(page => {
        return (<button className="page-nav-item" key={page} onClick={() => { props.setPage(page) }}>{page}</button>)
      })}
    </div>
  );
};