import React, { useEffect, useState } from 'react';
import { PageNav } from './pageNav/pageNav';
import './dataTable.css';

export const DataTable = (props) => {
  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchJson("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        setData(res);
      });
  }, []);
  return (
    <>
      <div >
        <table>
          <thead>
            <tr>
              <th>The table header</th>
            </tr>
          </thead>
          <tbody className="data-table-wrapper">
            {data && data.filter(({ id }) => 50 * page >= id && 50 * (page - 1) <= id).map(({ name, email, id }) => {
              return (
                <tr key={`${id}${email}`}>
                  <td className="first-col">{name}</td>
                  <td className="second-col">{email}</td>
                  <td className="third-col">{id}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <PageNav page={page} setPage={setPage} />
    </>
  );
};