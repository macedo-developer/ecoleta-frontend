import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Map, Marker, TileLayer } from "react-leaflet";

import logo from "../../assets/logo.svg";

import "./styles.css";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const ListPoints = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    <div id="page-list-point">
      <div className="container">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <main>
          <h1>Pesquise Pontos de Coleta</h1>

          <form>
            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <div className="field-group">
                <div className="field">
                  <label>Estado</label>
                  <input type="text" placeholder="Ex: PB" max={2} />
                </div>

                <div className="field">
                  <label>Cidade</label>
                  <input type="text" placeholder="Ex: João Pessoa" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <span>Selecione um ou mais itens abaixo</span>
              </legend>

              <ul className="items-grid">
                {items.map((item) => (
                  <li key={item.id}>
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <button type="submit">Pesquisar</button>

            <span>Consulte o resultado abaixo</span>
          </form>

          <Map center={initialPosition} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={initialPosition} />
          </Map>
        </main>
      </div>
    </div>
  );
};

export default ListPoints;
