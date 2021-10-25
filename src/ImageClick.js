
import PropTypes from "prop-types";
import React, { Component, useState, useEffect, useRef } from 'react';
const images = [{image: 'bitcoinlogo',width:200, height:200},{image: 'Ethereum_logo_2014.svg', width:150, height:200}]

const ImageClick =({images, doSomethingAfterClick}) => {
    const [clickedId, setClicked ] = useState(-1); 
    const handleClick = (event, id) => {
        setClicked(id);
        console.log(event); 
        doSomethingAfterClick(event);
      };

      
    return (
        <>
          {images.map((image, i) => (
            <img
              key={i}
              src={require('./' + image.image+ '.png')}
              width = {image.width + 'px'}
              height= {image.height+'px'}
              onClick={(event) => handleClick(event, i)}
              className={i === clickedId ? "customImage active1" : "customImage"} 
            >
            </img>
            
          ))}
    
  
        </>
      );
    };


export default ImageClick;