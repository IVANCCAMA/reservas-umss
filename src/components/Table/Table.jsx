import PropTypes from 'prop-types';

const Tabla = ({
  rows,
  firstRow = 1,
  lastRow = rows?.length,
  enumeration = true,
  typeTable = 'table-striped',
  trCliclable = false,
  handleClickRow = () => {},
}) => {
  if (rows.length === 0) {
    return <>No existen datos</>;
  } else {
    return (
      <div className="table-responsive">
        <table className={`table ${typeTable} border border-1`}>
          <thead>
            <tr>
              {enumeration && <th scope="col">#</th>}
              {Object.keys(rows[0]).map((head, index) => {
                if (head !== 'id_notificacion') {
                  return (
                    <th key={`header-${index}`} scope="col">
                      {head}
                    </th>
                  );
                }
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => {
              return rows.length > 0
                ? index < lastRow && index >= firstRow && (
                    <tr
                      key={`row-${index}`}
                      onClick={() => handleClickRow(row.id_notificacion)}
                      className={`${trCliclable ? 'clickable-row' : ''}`}
                      id={row.id_notificacion ? row.id_notificacion : index}
                    >
                      {enumeration && <th scope="row">{index + 1}</th>}
                      {Object.keys(row)
                        .filter((col) => col !== 'id_notificacion')
                        .map((col) => (
                          <td className={`${col}`} key={`row-${index}-${col}`}>
                            {row[col] ? row[col] : '-'}
                          </td>
                        ))}
                    </tr>
                  )
                : // cuando la tabla está vacia
                  null;
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

Tabla.propTypes = {
  rows: PropTypes.array,
  firstRow: PropTypes.number,
  lastRow: PropTypes.number,
  enumeration: PropTypes.bool,
};

export default Tabla;
