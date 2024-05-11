// DataTable.js

import React from 'react';
import { useTable, usePagination } from 'react-table';
import getTableStyles from './tableStyles';

const DataTable = ({ columns, data }) => {
  const [pageSize, setPageSize] = React.useState(5);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize },
      manualPagination: true,
    },
    usePagination
  );

  const tableStyles = getTableStyles({ color2: "#CCCCCC", color4: "#555555" });

  const handleChangePageSize = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
  };

  return (
    <div>
      <div>
        <label htmlFor="pageSize">Rows per page: </label>
        <select id="pageSize" value={pageSize} onChange={handleChangePageSize}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table {...getTableProps()} style={{ ...tableStyles.table.style, borderSpacing: 0 }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={tableStyles.headRow.style}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={tableStyles.headCells.style}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={tableStyles.rows.style}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={tableStyles.cells.style}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={tableStyles.pagination.style}>
        <button onClick={() => previousPage()} style={tableStyles.pagination.pageButtonsStyle} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} style={tableStyles.pagination.pageButtonsStyle} disabled={!canNextPage}>
          Next
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
      </div>
    </div>
  );
};

export default DataTable;
