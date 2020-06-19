import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import logo from "../../assets/logo.svg";

const ListPoints = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

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
          <h1>Pontos de Coleta</h1>

          <form>
            <div className="field-group">
              <div className="field">
                <legend>Estado</legend>
                <input type="text" placeholder="Ex: PB" max={2} />
              </div>

              <div className="field">
                <legend>Cidade</legend>
                <input type="text" placeholder="Ex: João Pessoa" />
              </div>
            </div>
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
