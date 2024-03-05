import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <div className="elemento">
          Ejemplo uso de Sass elemento
          <div className="sub-elemento">sub elemento</div>
        </div>

        <div className="ejemplo-sass-global">Ejemplo Sass Global</div>

        <button className="btn btn-primary" type="button">
          Button Bootstrap
        </button>

        <div className="feature border border-primary m-2">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center  bg-gradient fs-2 mb-3">
            <i className="bi bi-person-circle"></i>
          </div>
          <h3 className="fs-2 text-body-emphasis">Featured title</h3>
          <p>
            Paragraph of text beneath the heading to explain the heading. Well
            add onto it with another sentence and probably just keep going until
            we run out of words.
          </p>
          <a href="#" className="icon-link">
            Call to action
          </a>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
