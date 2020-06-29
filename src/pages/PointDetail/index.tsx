import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiPhoneCall,
  FiAtSign,
  FiFilter,
} from "react-icons/fi";

import logo from "../../assets/logo.svg";

import api from "../../services/api";

import "./styles.css";

interface RouteParams {
  location: {
    state: {
      id_point: number;
    };
  };
}

interface Point {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const PointDetail = (routeParams: RouteParams) => {
  const history = useHistory();
  const id_point = routeParams.location.state.id_point;

  const [data, setData] = useState<Point>();

  useEffect(() => {
    api.get(`points/${id_point}`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div id="page-detail-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/list-points">
          <FiArrowLeft />
          Voltar para a listagem
        </Link>
      </header>

      <main>
        <img src={data?.point.image_url} alt={data?.point.name} />
        <fieldset>
          <h1>{data?.point.name}</h1>
          <p>
            <FiMapPin />
            {data?.point.city}, {data?.point.uf}
          </p>
          <p>
            <FiFilter />
            {data?.items.map((item) => item.title).join(", ")}
          </p>

          <Link
            to={{
              pathname: `mailto:${data?.point.email}`,
            }}
            target="_blank"
          >
            <FiAtSign />
            {data?.point.email}
          </Link>
          <Link
            to={{
              pathname: `https://api.whatsapp.com/send?phone=${data?.point.whatsapp}`,
            }}
            target="_blank"
          >
            <FiPhoneCall />
            {data?.point.whatsapp}
          </Link>
        </fieldset>
      </main>
    </div>
  );
};

export default PointDetail;
