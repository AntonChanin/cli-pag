import React, { useEffect, useState } from 'react';
import { PageNav } from '../pageNav/pageNav';
import { FilterInput } from '../filterInput/filterInput';
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
  let [orderName, setOrderName] = useState(1);
  let [orderEmail, setOrderEmail] = useState(1);
  let [orderId, setOrderId] = useState(false);

  const sortData = (field, order) => {
    const dataBufer = data.concat();
    const sortedData = dataBufer.sort((a, b) => { return a[field] > b[field] ? 1 : -1 });
    order === false && sortedData.reverse();
    setDynamicData(sortedData);
  }

  return (
    <>
      <FilterInput data={dynamicData} setData={setDynamicData} useFetch={useFetch} />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="first-col-head" onClick={() => { sortData('name', orderName); setOrderName(!orderName); setOrderEmail(1); setOrderId(1) }}>
                {`Name ${orderName !== 1 ? (orderName ? '(desc)' : '(asc)') : ''}`}
              </th>
              <th className="second-col-head" onClick={() => { sortData('email', orderEmail); setOrderEmail(!orderEmail); setOrderName(1); setOrderId(1) }} >
                {`Email ${orderEmail !== 1 ? (orderEmail ? '(desc)' : '(asc)') : ''}`}
              </th>
              <th className="third-col-head" onClick={() => { sortData('id', orderId); setOrderId(!orderId); setOrderName(1); setOrderEmail(1); }}>
                {`Id ${orderId !== 1 ? (orderId ? '(desc)' : '(asc)') : ('')}`}
              </th>
            </tr>
          </thead>
          <tbody className="data-table-wrapper">
            {dynamicData && dynamicData.filter(({ id }) => 50 * page >= id && 50 * (page - 1) <= id).map(({ name, email, id }) => {
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