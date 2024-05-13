import PropTypes from 'prop-types';

export default function Pagination({ pageNumber, setPageNumber, lastPage }) {
  const pages = [
    { num: pageNumber - 2, text: pageNumber - 2 },
    { num: pageNumber - 1, text: pageNumber - 1 },
    { num: pageNumber, text: pageNumber },
    { num: pageNumber + 1, text: pageNumber + 1 },
    { num: pageNumber + 2, text: pageNumber + 2 },
  ];

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-md-end p-md-0 flex-wrap">
        {pageNumber == 1 ? null : (
          <li className="page-item">
            <button className="page-link" onClick={() => setPageNumber(pageNumber - 1)}>
              Anterior
            </button>
          </li>
        )}

        {pageNumber > 3 && (
          <li className="page-item">
            <button className="page-link" onClick={() => setPageNumber(1)}>
              1
            </button>
          </li>
        )}

        {pageNumber > 4 && (
          <li className="page-item d-flex">
            <span className="p-1">...</span>
          </li>
        )}

        {pages.map(
          (page, index) =>
            page.num > 0 &&
            page.num <= lastPage && (
              <li
                key={`page-item-${index}`}
                className={`page-item${pageNumber == page.num && ' active'}`}
              >
                <button className="page-link" onClick={() => setPageNumber(page.num)}>
                  {`${page.text}`}
                </button>
              </li>
            ),
        )}

        {pageNumber + 3 < lastPage && (
          <li className="page-item d-flex">
            <span className="p-1">...</span>
          </li>
        )}

        {pageNumber + 2 < lastPage && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPageNumber(lastPage)}
            >{`${lastPage}`}</button>
          </li>
        )}

        {pageNumber < lastPage && (
          <li className="page-item">
            <button className="page-link" onClick={() => setPageNumber(pageNumber + 1)}>
              Siguiente
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  pageNumber: PropTypes.number,
  setPageNumber: PropTypes.func,
  lastPage: PropTypes.number,
};
