import React, { useEffect, useState } from 'react';
import { PageNav } from './pageNav/pageNav';
import './dataTable.css';

export const DataTable = () => {
  const [dynamicData, setDynamicData] = useState(null);
  const useFetch = url => {

    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      setDynamicData(json);
    }

    useEffect(() => { fetchData() }, [url]);

    return dynamicData;
  };
  const [page, setPage] = useState(1);
  const data = useFetch("https://jsonplaceholder.typicode.com/comments");
  let [orderName, setOrderName] = useState(true);
  let [orderEmail, setOrderEmail] = useState(true);
  let [orderId, setOrderId] = useState(false);
  const sortData = (field, order) => {
    const dataBufer = data.concat();
    const sortedData = dataBufer.sort((a, b) => { return a[field] > b[field] ? 1 : -1 });
    order === false && sortedData.reverse();
    setDynamicData(sortedData);
  }

  return (
    <>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="first-col-head" onClick={() => { sortData('name', orderName); setOrderName(!orderName); }}>
                Name
              </th>
              <th className="second-col-head" onClick={() => { sortData('email', orderEmail); setOrderEmail(!orderEmail); }} >
                Email
              </th>
              <th className="third-col-head" onClick={() => { sortData('id', orderId); setOrderId(!orderId); }}>
                Id
              </th>
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