import React, { useState, useEffect, FormEvent } from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Map, Marker, TileLayer, Popup } from "react-leaflet";

import logo from "../../assets/logo.svg";

import api from "../../services/api";

import "./styles.css";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

const ListPoints = () => {
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectItems] = useState<number[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    api.get("/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectItems(filteredItems);
    } else {
      setSelectItems([...selectedItems, id]);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    api
      .get("/points", {
        params: {
          city: city,
          uf: uf,
          items: selectedItems,
        },
      })
      .then((response) => setPoints(response.data));
  }

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

          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <div className="field-group">
                <div className="field">
                  <label>Estado</label>
                  <input
                    type="text"
                    placeholder="Ex: PB"
                    max={2}
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: João Pessoa"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <span>Selecione um ou mais itens abaixo</span>
              </legend>

              <ul className="items-grid">
                {items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelectItem(item.id)}
                    className={
                      selectedItems.includes(item.id) ? "selected" : ""
                    }
                  >
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <button type="submit">Exibir Resultados</button>

            <fieldset>
              <legend>
                <span>0 encontrados</span>
              </legend>
              <Map center={initialPosition} zoom={15}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {points.map((point) => (
                  <Popup
                    key={point.id}
                    position={[point.latitude, point.longitude]}
                  >
                    <p>{point.name}</p>
                  </Popup>
                ))}
              </Map>
            </fieldset>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ListPoints;
