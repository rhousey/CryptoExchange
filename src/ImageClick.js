import { Row, Col, Dropdown, InputGroup } from "react-bootstrap";

import { render } from "@testing-library/react";
import PropTypes from "prop-types";
import React, { Component, useState, useEffect, useRef } from "react";
const images = [
  { image: "bitcoinlogo", name: "Bitcoin", width: 200, height: 200 },
  {
    image: "Ethereum_logo_2014.svg",
    name: "Ethereum",
    width: 150,
    height: 200,
  },
];

const ImageClick = ({ images, doSomethingAfterClick }) => {
  const [clickedId, setClicked] = useState(-1);
  const handleClick = (event, id) => {
    setClicked(id);
    console.log(event);
    doSomethingAfterClick(event);
  };

  return (
    <>
      {images.map((image, i) => (
        <div id="images">
          <img
            id="image"
            key={i}
            name={image.name}
            src={require("./" + image.image + ".png")}
            width={image.width + "px"}
            height={image.height + "px"}
            onClick={(event) => handleClick(event, i)}
            className={i === clickedId ? "customImage active1" : "customImage"}
          ></img>
          <span id="cap"> {image.name}</span>
        </div>
      ))}
    </>
  );
};

export default ImageClick;
