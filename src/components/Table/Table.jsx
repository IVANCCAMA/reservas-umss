import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'react-router-dom';

const Tabla = ({ rows, firstRow = 1, lastRow = rows?.length, enumeration = true }) => {
  
  return (
    <table className="table table-striped border border-1">
      <thead>
        <tr>
          {enumeration && <th scope="col">#</th>}

          {Object.keys(rows[0]).map((head, index) => (
            <th key={`header-${index}`} scope="col">{head}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          rows.length > 0 ? index < lastRow && index >= firstRow &&
            <tr key={`row-${index}`}>
              {enumeration && <th scope="row">{index + 1}</th>}

              {Object.keys(rows[0]).map((col, subIndex) => (
                <td key={`row-${index}-${col}`}>{row[col]}</td>
              ))}
            </tr> :
            // cuando la tabla está vacia
            null
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
