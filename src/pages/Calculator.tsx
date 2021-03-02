import React, { useState } from 'react';

import './Calculator.css';

import Image from '../assets/images/teorema-de-pitagoras.png';

import api from '../api/api';

interface Props {
  cathutes1: number;
  cathutes2: number;
}

const Calculator: React.FC = () => {
  const [data, setData] = useState({} as Props);

  const [result, setResult] = useState(null);
  const [hasFinished, setHasFinished] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHasFinished(false);
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api
        .post('/calculate', {
          cathutes1: data.cathutes1,
          cathutes2: data.cathutes2,
        })
        .then(res => {
          setResult(res.data.hypotenuse);
          setHasFinished(true);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // if (hypotenuse === '?') {
  //   if (
  //     String(cathutes1).indexOf(',') !== -1 ||
  //     String(cathutes2).indexOf(',') !== -1
  //   ) {
  //     let cathutesFormatted1 = String(cathutes1).replace(',', '.');
  //     let cathutesFormatted2 = String(cathutes2).replace(',', '.');
  //     let hypotenuse = Math.sqrt(
  //       Math.pow(Number(cathutesFormatted1), 2) +
  //         Math.pow(Number(cathutesFormatted2), 2)
  //     );
  //     setResult(Number(hypotenuse.toFixed(3)));
  //     setHasFinished(true);
  //   }
  // }
  //}

  return (
    <div className="container">
      <div className="cardContainer">
        <div className="card">
          <header>
            <h1>Calculadora de Pitágoras</h1>
          </header>
          <div className="content">
            <section>
              <div>
                <img src={Image} alt="" />
              </div>
            </section>

            <section>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="hipotenusa">Hipotenusa</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    name="hypotenuse"
                    id="hipotenusa"
                    placeholder="?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cateto">Cateto 1</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    name="cathutes1"
                    id="cateto"
                    placeholder="3"
                    size={4}
                    maxLength={4}
                    pattern="^[0-9.,]*$"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cateto 2">Cateto 2</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    name="cathutes2"
                    id="cateto2"
                    placeholder="4"
                    size={4}
                    maxLength={4}
                    pattern="^[0-9.,]*$"
                    onChange={handleChange}
                  />
                </div>
                <div className="buttonContainer">
                  <button type="submit">Calcular</button>
                </div>
              </form>
            </section>
          </div>
          <small>Somente números</small> <br />
          <small>
            Em caso de número fracionado, deverá coloca em forma decimal <br />
            <b>Exemplo:</b> 1/2 deverá coloca 0,50
          </small>
        </div>
        {hasFinished && (
          <div className="panelResult">
            <span>
              <b>Resposta:</b> O valor da hipotenusa é: {result}
            </span>
            <div>
              <span>
                <b>Hipotenusa:</b> {result}
              </span>
              <span>
                <b>Cateto 1:</b> {data.cathutes1}
              </span>
              <span>
                <b>Cateto 2:</b> {data.cathutes2}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
