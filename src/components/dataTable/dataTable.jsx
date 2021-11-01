import React, { useCallback, useEffect, useState } from 'react';
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
    };

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
    const sortedData = dataBufer.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    order === false && sortedData.reverse();
    setDynamicData(sortedData);
  };

  const nameSort = useCallback(() => {
    sortData('name', orderName);
    setOrderName(!orderName);
    setOrderEmail(1);
    setOrderId(1);
  }, [sortData, orderName]);

  const emailSort = useCallback(() => {
    sortData('email', orderEmail);
    setOrderEmail(!orderEmail);
    setOrderName(1);
    setOrderId(1);
  }, [sortData, orderEmail]);

  const idSort = useCallback(() => {
    sortData('id', orderId);
    setOrderId(!orderId);
    setOrderName(1);
    setOrderEmail(1);
  }, [sortData, orderId]);



  const renderRow = (dynamicData) => {
    const createSpace = (n) => {
      return Array(n).join(String.fromCharCode(160)).split('').reduce(
        (x, y) => (
          x += y
        )
      );
    };

    const filtered = dynamicData.filter((el, id) => 49 * page >= id && 49 * (page - 1) <= id);

    return (
      (filtered.length === 50) ? (
        filtered.map(
          ({ name, email, id }) => (
            <tr key={`${id}${email}`}>
              <td className="first-col">{name}</td>
              <td className="second-col">{email}</td>
              <td className="third-col">{id}</td>
            </tr>
          )
        )
      ) : (
        <>
          <>
            {
              filtered.map(
                ({ name, email, id }) => (
                  <tr key={`${id}${email}`}>
                    <td className="first-col">{name}</td>
                    <td className="second-col">{email}</td>
                    <td className="third-col">{id}</td>
                  </tr>
                )
              )
            }
          </>
          <>
            {
              Array(50 - filtered.length).join('*').split('').map(
                (el, id) => (
                  <tr key={`${id}-${page}`}>
                    <td className="first-col empty-col">
                      {createSpace(43)}
                    </td>
                    <td className="second-col empty-col">
                      {createSpace(94)}
                    </td>
                    <td className="third-col empty-col">
                      {createSpace(9)}
                    </td>
                  </tr>
                )
              )
            }
          </>
        </>
      )
    );
  };

  return (
    <>
      <FilterInput data={dynamicData} setData={setDynamicData} useFetch={useFetch} />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="first-col-head" onClick={nameSort}>
                {`Name ${orderName !== 1 ? (orderName ? '(desc)' : '(asc)') : ''}`}
              </th>
              <th className="second-col-head" onClick={emailSort} >
                {`Email ${orderEmail !== 1 ? (orderEmail ? '(desc)' : '(asc)') : ''}`}
              </th>
              <th className="third-col-head" onClick={idSort}>
                {`Id ${orderId !== 1 ? (orderId ? '(desc)' : '(asc)') : ('')}`}
              </th>
            </tr>
          </thead>
          <tbody className="data-table-wrapper">
            {dynamicData && renderRow(dynamicData)}
          </tbody>
        </table>
      </div>
      <PageNav page={page} setPage={setPage} />
    </>
  );
};