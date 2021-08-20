import React from 'react';
import './filterInput.css';

export const FilterInput = (props) => {
  const updateFetch = (url, value) => {

    async function fetchData() {
      fetch(url).then(async res => {
        const json = await res.json();
        if (value) {
          props.setData(json.filter(({ name, email, id }) => {
            console.table(json)
            return `${name}`.includes(value) || `${email}`.includes(value) || `${id}`.includes(value)
          }))
        } else {
          props.setData(json);
        }
      })
    }
    fetchData();
    return props.data;
  };
  return (
    <div className="filter-input">
      <input onChange={(e) => {
        const value = e.target.value;
        const data = updateFetch("https://jsonplaceholder.typicode.com/comments", value);
        props.setData(data);
      }} />
    </div>
  );
};