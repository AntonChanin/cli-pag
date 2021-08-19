import React from 'react';
import './filterInput.css';

export const FilterInput = (props) => {
  const updateFetch = url => {

    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      props.setData(json);
    }
    fetchData().then();
    return props.data;
  };
  return (
    <div className="filter-input">
      <input onChange={(e) => {
        const value = e.target.value;
        if (!value) {
          const data = updateFetch("https://jsonplaceholder.typicode.com/comments");
          props.setData(data);
        } else {
          props.setData(props.data.filter(({ name, email, id }) => {
            return `${name}`.includes(value) || `${email}`.includes(value) || `${id}`.includes(value)
          }))
          console.table(props.data.filter(({ name, email, id }) => {
            return `${name}`.includes(value) || `${email}`.includes(value) || `${id}`.includes(value)
          }))
          console.log(value)
        };
      }} />
    </div>
  );
};