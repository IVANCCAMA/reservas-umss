import { Link } from "react-router-dom";

const CardComponent = () => {
  return (
    <div className="feature border border-primary m-2">
      <div className="feature-icon d-inline-flex align-items-center justify-content-center  bg-gradient fs-2 mb-3">
        <i className="bi bi-person-circle"></i>
      </div>
      <h3 className="fs-2 text-body-emphasis">Featured title</h3>
      <p>
        Paragraph of text beneath the heading to explain the heading. Well add onto it with another
        sentence and probably just keep going until we run out of words.
      </p>
      <Link to={'/home'} className="icon-link">
        Call to action
      </Link>
    </div>
  );
};

export default CardComponent;
