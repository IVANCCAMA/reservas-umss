import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';
import { useState } from 'react';
import '../../App.scss';
import CardComponent from '../../components/Examples/CardComponent/CarComponent';

export default function ExamplePage() {
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
        <button onClick={() => setCount((count) => count + 1)} className="btn btn-secondary">
          count is {count}
        </button>
        <br />
        <div className="elemento">
          Ejemplo uso de Sass elemento
          <div className="sub-elemento">sub elemento</div>
        </div>

        <button className="btn btn-primary" type="button">
          Button Bootstrap
        </button>

        <h3 className="mt-3">Component React</h3>
        <CardComponent></CardComponent>
        <CardComponent></CardComponent>
      </div>
    </div>
  );
}
