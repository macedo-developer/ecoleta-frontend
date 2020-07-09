import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiList } from "react-icons/fi";

import "./styles.css";
import "./responsive.css";

import logo from "../../assets/logo.svg";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/list-points">
            <FiList size={20} color="#34cb79" />
            Pontos de coleta
          </Link>
        </header>

        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
          </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
